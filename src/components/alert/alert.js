import Alert from 'react-bootstrap/Alert';
import React from 'react';

function ErrorAlert(props) {
  const { genderPref, selectedBands } = props;
  console.log('Alert props: ', props);

  const checkGender = () => {
    console.log('Checking gender! ');
    if (genderPref[0] === 'female') {
      if (
        (selectedBands.includes('BTS') && selectedBands.length === 1) ||
        (selectedBands.includes('Exo') && selectedBands.length === 1) ||
        (selectedBands.includes('BTS') &&
          selectedBands.includes('Exo') &&
          selectedBands.length === 2)
      ) {
        return (
          <Alert variant="light">
            <Alert.Heading>
              Your current search will return no results, since you selected All
              Girls, and only boy groups. Please edit your search
            </Alert.Heading>
          </Alert>
        );
      }
    }
    if (genderPref[0] === 'male') {
      console.log('Checking for a boy group!');
      if (!selectedBands.includes('BTS') || !selectedBands.includes('Exo')) {
        return (
          <Alert variant="light">
            <Alert.Heading>
              Your current search will return no results, since you selected All
              Girls, and only boy groups. Please edit your search
            </Alert.Heading>
          </Alert>
        );
      }
    }
  };

  return (
    <div>
      {genderPref.length === 1 && selectedBands.length > 0
        ? checkGender()
        : null}
    </div>
  );
}

export default ErrorAlert;
