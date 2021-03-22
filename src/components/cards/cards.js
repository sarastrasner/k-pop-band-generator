import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import CardDeck from 'react-bootstrap/CardDeck';
import { connect } from 'react-redux';
import { get, updateShowCustomizer } from '../../store/store';
import './cards.scss';
import Customizer from '../customizer/customizer';
const mapDispatchToProps = { get, updateShowCustomizer };

function Cards(props) {
  const [customBand, setCustomBand] = useState([]);
  let results = props.stars.kPop.results;
  console.log('What is this????', props.stars.kPop.results);
  console.log("Here's your band!", customBand);

  useEffect(() => {
    props.get();
    setCustomBand([props.stars.kPop.results]);
    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    console.log('You clicked the button!');
    console.log("Here's your band!", customBand);
  };

  const renderCustomizer = () => {
    props.updateShowCustomizer();
  };

  return (
    <div id="cards">
      <ButtonGroup aria-label="Basic example">
        <Button className="button" variant="info" onClick={() => handleClick()}>
          Give Me a Random Band
        </Button>
        <Button
          className="button"
          variant="info"
          onClick={() => renderCustomizer()}
        >
          Customize My Band
        </Button>
      </ButtonGroup>
      {props.stars.kPop.showCustomizer ? <Customizer /> : ''}
      <CardDeck>
        {results
          ? results.map((person, idx) => (
              <Card className="individialCards" key={idx}>
                <Card.Img
                  variant="top"
                  //src={props.stars.kPop.results[0].members[0].photo}
                />
                <Card.Title className="title">{person.name}</Card.Title>
                <Card.Body>
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
            ))
          : ''}
      </CardDeck>
    </div>
  );
}

const mapStateToProps = state => ({
  stars: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
