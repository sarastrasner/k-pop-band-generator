import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import CardDeck from 'react-bootstrap/CardDeck';
import { connect } from 'react-redux';
import {
  updateShowCustomizer,
  getNewData,
  generateName,
} from '../../store/store';
import './cards.scss';
import Customizer from '../customizer/customizer';
import Loading from '../loading/loading';
import placeholder from '../../assets/placeholder.jpeg';

const mapDispatchToProps = { updateShowCustomizer, getNewData, generateName };

function Cards(props) {
  let {
    customBand,
    showCustomizer,
    preferredQTY,
    genderPreference,
    bandPreference,
    bandName,
  } = props.stars;
  const [show, setShow] = useState(false);

  useEffect(() => {
    props.getNewData(preferredQTY, genderPreference, bandPreference);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="cards">
      <ButtonGroup aria-label="Basic example">
        <Button
          className="button"
          variant="info"
          onClick={() =>
            props.getNewData(preferredQTY, genderPreference, bandPreference)
          }
        >
          Give Me a Random Band
        </Button>
        <Button
          className="button"
          variant="info"
          onClick={() => props.updateShowCustomizer()}
        >
          Customize My Band
        </Button>
        <Button
          className="button"
          variant="info"
          onClick={() => {
            setShow(true);
            props.generateName();
          }}
        >
          Generate a Name for My Band
        </Button>
      </ButtonGroup>
      {showCustomizer ? <Customizer /> : ''}
      <Alert
        show={show}
        variant="light"
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>
          Your band name is:
          <strong> {bandName}</strong>
        </Alert.Heading>
        <Button onClick={() => props.generateName()} variant="outline-info">
          Get a different name
        </Button>
      </Alert>
      {customBand.length > 0 ? (
        <CardDeck className="card-deck">
          <div className="container">
            <div className="row row-cols-4">
              {customBand.map((person, idx) => (
                <div className="col" key={idx}>
                  <Card className="individialCards" key={idx}>
                    {person.photo !== 'no image' ? (
                      <Card.Img variant="top" src={person.photo} />
                    ) : (
                      <Card.Img variant="top" src={placeholder} />
                    )}
                    <Card.Body>
                      <Card.Title className="title">
                        <strong>{person.name}</strong> | {person.group}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {person.specialty.join(' and ')}
                      </Card.Subtitle>
                      <Card.Text>{person.bio}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        Learn more about{' '}
                        <a
                          href={`${person.link}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {person.name}
                        </a>
                      </small>
                    </Card.Footer>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </CardDeck>
      ) : (
        <Loading />
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  stars: state.kPop,
});

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
