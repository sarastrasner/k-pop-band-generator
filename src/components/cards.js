import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import CardDeck from 'react-bootstrap/CardDeck';
import { connect } from 'react-redux';
import { get, updateShowCustomizer } from '../store/store';
import './cards.scss';
import Customizer from './customizer';

const mapDispatchToProps = { get, updateShowCustomizer };

function Cards(props) {
  const [customBand, setCustomBand] = useState([]);
  //const [showCustomizer, setShowCustomizer] = useState(false);
  console.log('Show customizer?', props.stars.kPop.showCustomizer);

  //console.log(props.stars.kPop.results[0].members[0].photo);
  useEffect(() => {
    props.get();
    setCustomBand([props.stars.kPop.results]);
    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    console.log('You clicked the button!');
  };

  const renderCustomizer = () => {
    props.updateShowCustomizer();
    //console.log('You want to customize?', props.stars.kPop.showCustomizer);
  };

  return (
    <>
      <ButtonGroup aria-label="Basic example">
        <Button className="button" onClick={() => handleClick()}>
          Give Me a Random Band
        </Button>
        <Button className="button" onClick={() => renderCustomizer()}>
          Customize My Band
        </Button>
      </ButtonGroup>
      {props.stars.kPop.showCustomizer ? <Customizer /> : ''}

      {/* {customBand.length > 0
        ? customBand[0].map((person, idx) => (
            <div key={idx}>
              <p>{person.name}</p>
              <p>{person.id}</p>
            </div>
          ))
        : ''} */}
      <CardDeck>
        <Card>
          <Card.Img
            variant="top"
            //src={props.stars.kPop.results[0].members[0].photo}
          />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This card has supporting text below as a natural lead-in to
              additional content.{' '}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </CardDeck>
    </>
  );
}

const mapStateToProps = state => ({
  stars: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
