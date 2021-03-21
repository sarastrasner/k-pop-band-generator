import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import { connect } from 'react-redux';
import { get } from '../store/store';
import './cards.scss';

const mapDispatchToProps = { get };

function Cards(props) {
  //const [customBand, setCustomBand] = useState([]);
  //console.log(props.stars.kPop.results[0].members[0].photo);
  useEffect(() => {
    props.get();
    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    console.log('You clicked the button!');
  };

  return (
    <>
      {/* {props.stars.kPop.results
        ? props.stars.kPop.results.map((band, idx) => (
            <div key={idx}>
              <h3>{band.name}</h3>
            </div>
          ))
        : ''} */}
      <Button 
      className="button"
      onClick={() => handleClick()}>Give me a band</Button>
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
