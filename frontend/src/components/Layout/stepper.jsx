function Stepper({ steps, currentStep, color = '#000' }) {
  return (
    <div style={styles.container}>
      {steps.map((label, index) => {
        const isDone = index <= currentStep;
        const dotColor = isDone ? color : '#000';
        const isLastDone = index === currentStep;

        return (
          <div key={label} style={styles.step}>
            <div style={styles.stepContent}>
              <span style={styles.label}>{label}</span>
              <div
                style={{
                  ...styles.dot,
                  borderColor: isLastDone ? '#000' : dotColor,
                  backgroundColor: '#fff',
                }}
              />
            </div>
            {index < steps.length - 1 && (
              <div
                style={{
                  ...styles.line,
                  backgroundColor: index < currentStep ? color : '#000',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  stepContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  label: {
    fontSize: '12px',
    marginBottom: '8px',
    whiteSpace: 'nowrap',
  },
  dot: {
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    border: '3px solid',
    flexShrink: 0,
  },
  line: {
    height: '2px',
    flex: 1,
    marginBottom: '20px', // aligns with dot center, since label sits above
  },
};

export default Stepper;