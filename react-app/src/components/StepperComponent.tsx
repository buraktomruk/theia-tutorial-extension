import React, {useState} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { VSCodeAPI } from '../VSCodeAPI';
import { Exercise } from './exercise';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
      color: 'white'
    },
    resetButton: {
      color: 'white'
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

function getSteps(tutorialExercises: any) {
  return tutorialExercises.map((tutorial: any) => tutorial.title);
}

interface StepperComponentProps {
  tutorialExercises: Array<Object>;
}

const StepperComponent = (props: StepperComponentProps) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps(props.tutorialExercises);
  const [isFileListCorrect, setFilesCheck] = useState(false);

  const handleNext = () => {
    if(activeStep === 0){
      VSCodeAPI.postMessage({command: 'checkExerciseFiles'});

      VSCodeAPI.onMessage((message) => {
        switch (message.data.command){
          case 'checkFilesResult':  
            if(message.data.result && !isFileListCorrect){
              setActiveStep((prevActiveStep) => prevActiveStep + 1);
              setFilesCheck(true);
            }
            break;
        }
      });
    }else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  console.log('activeStep: ', activeStep);

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label: any) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button className={classes.resetButton} onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              <Exercise exercise={props.tutorialExercises[activeStep]}></Exercise>
            </Typography>
            <div>
              <Button
                variant="contained"
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepperComponent;