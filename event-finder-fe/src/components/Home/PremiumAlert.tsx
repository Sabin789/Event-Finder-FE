import React from 'react';
import  { useState } from 'react';
import { Alert } from 'react-bootstrap';

const PremiumAlert = () => {
  const [showAlert, setShowAlert] = useState(true);

  const hideAlert = () => {
    setShowAlert(false);
  };

  // Automatically hide the alert after 5 seconds
  setTimeout(hideAlert, 5000);

  return (
    <div>
      {showAlert && (
        <Alert variant="success" onClose={hideAlert} dismissible>
          This is a success alert that will disappear in 5 seconds.
        </Alert>
      )}
    </div>
  );
};

export default PremiumAlert