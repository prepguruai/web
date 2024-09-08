import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IsLoggedIn } from '../services/LoginService';
import { QuizQuestion } from '../generated/quiz_pb';
import { GetContest, SubmitAnswer } from '../services/QuizService';

import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Fab,
    Box,
    CircularProgress
  } from '@mui/material';
import { styled } from '@mui/system';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function ContestPage() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!IsLoggedIn()) {
            window.location.href = '/loginWithGoogle';  // Redirect to the login page if not logged in
        }
    }, [navigate]);

    const [questionIndex, setQuestionIndex] = React.useState<number>(0);
    const [selectedOption, setSelectedOption] = React.useState<string>('');
    const [isOptionDisabled, setIsOptionDisabled] = React.useState<boolean>(false);
    const [isAnswerCorrect, setIsAnswerCorrect] = React.useState<boolean | null>(null);
    const [explanation, setExplanation] = React.useState<string>('');
    const [questions, setQuestions] = React.useState<QuizQuestion[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setIsLoading(true);
                if (questions.length === 0) {
                    setQuestions(await GetContest());
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setError('Failed to load questions');
                setIsLoading(false);
            }
        }

        fetchQuestions();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNext = () => {
        if (questionIndex < questions.length - 1) {
            setQuestionIndex(questionIndex + 1);
            setSelectedOption('');
            setIsOptionDisabled(false);
            setIsAnswerCorrect(null);
            setExplanation('');
        }
        else {
            navigate('/');  // Redirect to the home page after the last question
        }
    };

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        setIsOptionDisabled(true);

        // Submit the answer
        const submitAnswer = async () => {
            try {
                const response = await SubmitAnswer(questions[questionIndex].getQhash(), selectedValue);
                const explanationText = response.getExplanation();
                setIsAnswerCorrect(response.getIscorrect());
                setExplanation(explanationText);
            } catch (error) {
                setError('Failed to submit answer');
            }
        }

        submitAnswer();
    };

    if (isLoading) {
        return (
          <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: '20%' }}>
            <CircularProgress />
            <Typography variant="h6">Loading questions...</Typography>
          </Container>
        );
    }
    
    if (error) {
        return (
          <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: '20%' }}>
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          </Container>
        );
    }

    return (
        <div>
            <AppBarStyled position="static">
                <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Assessment
                </Typography>
                <Typography variant="h6">
                    {questionIndex + 1}/{questions.length}
                </Typography>
                </Toolbar>
            </AppBarStyled>

            <QuestionContainer maxWidth="sm">
                <Typography variant="h5" gutterBottom>
                    Question
                </Typography>
                <Typography variant="h6" gutterBottom>
                    {questions[questionIndex].getQuestion()}
                </Typography>
                <FormControl component="fieldset">
                    <RadioGroup value={selectedOption} onChange={handleOptionChange}>
                        {questions[questionIndex].getOptionsList().map((option, index) => (
                            <FormControlLabel
                                key={index}
                                value={option}
                                control={<Radio disabled={isOptionDisabled} />}
                                label={option}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>

                {/* Space below the form control */}
                <Box mb={4} />

                {/* Answer Explanation */}
                {isAnswerCorrect !== null && (
                    <Typography variant="h6" gutterBottom sx={{ color: isAnswerCorrect ? 'green' : 'red' }}>
                        {isAnswerCorrect ? 'Correct Answer' : 'Wrong Answer'}
                    </Typography>
                )}

                {explanation && (
                    <Typography variant="body1" gutterBottom>
                        {explanation}
                    </Typography>
                )}
            </QuestionContainer>

            <FabStyled color="primary" aria-label="next" onClick={handleNext}>
                <ArrowForwardIosIcon />
            </FabStyled>
        </div>
    );
}

const AppBarStyled = styled(AppBar)({
    marginBottom: '16px'
});

const FabStyled = styled(Fab)({
    position: 'fixed',
    right: '32px',
    bottom: '48px'
});

const QuestionContainer = styled(Container)({
    padding: '16px',
    backgroundColor: '#fff',
    borderRadius: '8px'
});

export default ContestPage;