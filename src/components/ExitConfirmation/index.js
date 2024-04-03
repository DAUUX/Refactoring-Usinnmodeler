import { useEffect } from 'react';

function ExitConfirmation() {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ''; // Empty string to suppress the default confirmation message
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null; // Or render a custom message/modal if needed
}

export default ExitConfirmation;
