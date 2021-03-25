import React  from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import CardDeck from 'react-bootstrap/CardDeck';
import { connect } from 'react-redux';
import { updateShowCustomizer } from '../../store/store';
import './cards.scss';
import Customizer from '../customizer/customizer';
import { useQuery } from 'graphql-hooks';
import placeholder from '../../assets/placeholder.jpeg';

const mapDispatchToProps = { updateShowCustomizer };

function Cards(props) {
  console.log('props.stars',props.stars.preferredQTY);

  const CUSTOM_QUERY = `query{
    performersCustom (limit:${props.stars.preferredQTY}) {
      name
      gender
      group
      photo
      specialty
      bio
    }
  }
  `;

  const { loading, error, data } = useQuery(CUSTOM_QUERY);

  if (loading) return 'Loading...';
  if (error) return 'Something Bad Happened';

  console.log('Data from new thing: ', data);

  const handleClick = () => {
    console.log('You clicked the button!');
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
      {props.stars.showCustomizer ? <Customizer /> : ''}
      <CardDeck className="card-deck">
        <div className="container">
          <div className="row row-cols-4">
            {data.performersCustom
              ? data.performersCustom.map((person, idx) => (
                  <div className="col" key={idx}>
                    <Card className="individialCards" key={idx}>
                      {person.photo !== 'no image' ? (
                        <Card.Img variant="top" src={person.photo} />
                      ) : (
                        <Card.Img variant="top" src={placeholder} />
                      )}
                      <Card.Body>
                        <Card.Title className="title">{person.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {person.group}
                        </Card.Subtitle>
                        <Card.Text>{person.bio}</Card.Text>
                      </Card.Body>
                      <ListGroup variant="flush">
                        {person.specialty.map((item, idx) => {
                          return (
                            <ListGroup.Item key={idx}>{item}</ListGroup.Item>
                          );
                        })}
                      </ListGroup>
                      <Card.Footer>
                        <small className="text-muted"> </small>
                      </Card.Footer>
                    </Card>
                  </div>
                ))
              : ''}
          </div>
        </div>
      </CardDeck>
    </div>
  );
}

const mapStateToProps = state => ({
  stars: state.kPop,
});

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
