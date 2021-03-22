import React, { useState } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function Customizer(props) {
  console.log('State in Customizer', props);
  const [selectedBands, updateSelectedBands] = useState([]);
  const [genderPreference, updateGenderPreference] = useState('');

  //console.log(props.stars.kPop.results[0].members[0].photo);
  console.log(selectedBands);

  const handleSubmit = e => {
    console.log('You want to submit!');
  };

  const handleRadio = e => {
    console.log(`You only want ${e.target.id}`);
  };

  const handleCheck = e => {
    e.preventDefault();
    updateSelectedBands([...selectedBands, e.target.id]);
    console.log('You want:', e.target.id);
  };
  return (
    <>
      <Form>
        <Form.Row>
          <Col xs={3}>
            <Form.Group>
              <Form.Label>Only include members from these bands:</Form.Label>
              {props.stars.kPop.results.map((band, idx) => (
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
              <Form.Label>Make my band: </Form.Label>
              <Form.Check
                name="genderSelect"
                custom
                inline
                label="All Girls"
                type="radio"
                id="girls"
                onClick={e => handleRadio(e)}
              />
              <Form.Check
                name="genderSelect"
                custom
                inline
                label="All Boys"
                type="radio"
                id="boys"
                onClick={e => handleRadio(e)}
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Button
            variant="primary"
            type="submit"
            onClick={e => handleSubmit(e)}
          >
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

export default connect(mapStateToProps)(Customizer);
