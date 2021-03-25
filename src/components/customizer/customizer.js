import React, { useState } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import RangeSlider from 'react-bootstrap-range-slider';
import './customizer.scss';
import {
  updateBandPreference,
  updateGenderPreference,
  updateQTYPreference,
} from '../../store/store';
const mapDispatchToProps = {
  updateBandPreference,
  updateGenderPreference,
  updateQTYPreference,
};

function Customizer(props) {
  let bandArray = [{name:'Blackpink'}, {name:"BTS"}, {name: 'Red Velvet'}, {name:'TWICE'}];
  console.log(props);
  const [selectedBands, updateSelectedBands] = useState([]);
  const [genderPreference, updateGenderPreference] = useState('');
  const [value, setValue] = React.useState(5);
  const [bandQTY, setBandQTY] = useState('');

  //console.log(props.stars.kPop.results[0].members[0].photo);
  console.log(
    `Selected bands: ${selectedBands}, bandQTY: ${bandQTY}, gender preference: ${genderPreference}`
  );

  const handleSubmit = e => {
    e.preventDefault();
    e.target.reset();
    if (selectedBands) props.updateBandPreference(selectedBands);
    if (genderPreference) props.updateGenderPreference(genderPreference);
    if (bandQTY) props.updateQTYPreference(bandQTY);
  };

  const handleQTYChange = e => {
    e.preventDefault();
    setValue(e.target.value);
    setBandQTY(e.target.value);
    console.log(`Give me the id!!!!! ${e.target.value}`);
  };

  const handleCheck = e => {
    e.preventDefault();
    updateSelectedBands([...selectedBands, e.target.id]);
    console.log('You want:', e.target.id);
  };
  return (
    <>
      <Form id="form" onSubmit={e => handleSubmit(e)}>
        <Form.Row>
          <Col xs={3}>
            <Form.Group>
              <Form.Label>Only include members from these bands:</Form.Label>
              {bandArray.map((band, idx) => (
                <div key={idx} className="mb-3">
                  <Form.Check
                    inline
                    custom
                    label={band.name}
                    onBlur={e => handleCheck(e)}
                    type="checkbox"
                    id={band.name}
                  />
                </div>
              ))}
            </Form.Group>
          </Col>
          <Col xs={3}>
            <Form.Group>
              <Form.Label>Make my band:{'  '}</Form.Label>
              <Form.Check
                name="genderSelect"
                custom
                inline
                label="All Girls"
                type="radio"
                id="girls"
                onClick={e => updateGenderPreference(e.target.id)}
              />
              <Form.Check
                name="genderSelect"
                custom
                inline
                label="All Boys"
                type="radio"
                id="boys"
                onClick={e => updateGenderPreference(e.target.id)}
              />
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
            Submit
          </Button>
        </Form.Row>
      </Form>
    </>
  );
}

const mapStateToProps = state => ({
  stars: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(Customizer);
