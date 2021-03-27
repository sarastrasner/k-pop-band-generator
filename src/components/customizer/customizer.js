import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import RangeSlider from 'react-bootstrap-range-slider';
import './customizer.scss';
import { getNewData, updateShowCustomizer } from '../../store/store';
const mapDispatchToProps = { getNewData, updateShowCustomizer };

function Customizer(props) {
  const [selectedBands, updateSelectedBands] = useState([]);
  const [genderPref, updateGenderPref] = useState([]);
  const [value, setValue] = React.useState(8);
  const [bandQTY, setBandQTY] = useState('');
  const [tempArray] = useState([]);
  let { preferredQTY, genderPreference, bandPreference } = props.stars;

  const renderCurrentFilters = () => {
    return (
      <p>
        You are currently filtering for{' '}
        <strong>
          {genderPref.length !== 1
            ? 'all genders'
            : genderPref[0] === 'male'
            ? 'only men'
            : genderPref[0] === 'female'
            ? 'only women'
            : null}
        </strong>
        ,{' '}
        <strong>{tempArray.length > 0 ? 'select bands ' : 'all bands '}</strong>
        and <strong>{value}</strong> members
      </p>
    );
  };

  useEffect(() => {
    if (genderPref[0] === 'female') {
      console.log('only girls!');
    }
    if (genderPref[0] === 'male') console.log('only boys!');
  }, [genderPref]);

  const handleSubmit = e => {
    e.preventDefault();
    e.target.reset();
    if (selectedBands.length > 0) {
      console.log('Selected bands: ', selectedBands);
      bandPreference = selectedBands;
      updateSelectedBands([]);
    }
    if (genderPref.length > 0) {
      console.log('Gender pref: ', genderPref);
      genderPreference = genderPref;
      updateGenderPref([]);
    }
    if (bandQTY) {
      console.log('Band QTY: ', bandQTY);
      preferredQTY = bandQTY;
      setBandQTY('');
      setValue(5);
    }
    props.getNewData(preferredQTY, genderPreference, bandPreference);
    props.updateShowCustomizer();
  };

  const handleQTYChange = e => {
    e.preventDefault();
    setValue(e.target.value);
    setBandQTY(e.target.value);
  };

  const handleCheck = e => {
    e.preventDefault();
    if (!tempArray.includes(e.target.id)) {
      tempArray.push(e.target.id);
    } else if (tempArray.includes(e.target.id)) {
      for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i] === e.target.id) {
          tempArray.splice(i, 1);
        }
      }
    }
    updateSelectedBands(tempArray);
    //updateSelectedBands([...selectedBands, e.target.id]);
  };

  return (
    <>
      <Form id="form" onSubmit={e => handleSubmit(e)}>
        <h4>
          You can customize your results by using any or all of the following
          filters:
        </h4>
        {renderCurrentFilters('meow', 'test', 1)}
        <Form.Row>
          <Col xs={4}>
            <Form.Group>
              <Form.Label>Make my band:{'  '}</Form.Label>
              <Form.Check
                name="genderSelect"
                custom
                inline
                label="All Girls"
                type="radio"
                id="female"
                onClick={e => updateGenderPref([e.target.id])}
              />
              <Form.Check
                name="genderSelect"
                custom
                inline
                label="All Boys"
                type="radio"
                id="male"
                onClick={e => updateGenderPref([e.target.id])}
              />
              <Form.Check
                name="genderSelect"
                custom
                inline
                label="Both"
                type="radio"
                id="both"
                onClick={e => updateGenderPref(['male', 'female'])}
              />
            </Form.Group>
          </Col>
          <Col xs={3}>
            <Form.Group>
              <Form.Label>Only include members from these bands:</Form.Label>
              {bandPreference.map((band, idx) => (
                <div key={idx} className="mb-3">
                  <Form.Check
                    inline
                    custom
                    label={band}
                    onBlur={e => handleCheck(e)}
                    type="checkbox"
                    id={band}
                  />
                </div>
              ))}
            </Form.Group>
          </Col>
          <Col xs={3}>
            <Form.Group>
              <Form.Label>Give my band this many members:</Form.Label>
              <RangeSlider
                tooltip="auto"
                value={value}
                min={2}
                max={9}
                variant="info"
                onChange={e => handleQTYChange(e)}
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Button variant="info" type="submit">
            Get New Band
          </Button>
        </Form.Row>
      </Form>
    </>
  );
}

const mapStateToProps = state => ({
  stars: state.kPop,
});

export default connect(mapStateToProps, mapDispatchToProps)(Customizer);
