import { useState } from 'react';
import { SectionId1, SectionId2 } from './Utils/shortid';
import '../App.css';

import { Section } from './Section';
import { FeedbackOptions } from './FeedbackOptions';
import { Statistics } from './Statistics';
import { Notification } from './Notification';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickFeedback = event => {
    const stateKey = event.target.textContent.toLowerCase();

    switch (stateKey) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;

      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;

      case 'bad':
        setBad(prevState => prevState + 1);
        break;

      default:
        console.log(`No option called ${stateKey}`);
        break;
    }
  };

  const countTotalFeedback = () => good + bad + neutral;

  const totalFeedback = countTotalFeedback();

  const countPositiveFeedbackPercentage = () => {
    return totalFeedback > 0 && Math.ceil((good / totalFeedback) * 100);
  };

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <Section id={SectionId1} title={'Please leave feedback'}>
            <div className="feedbackBtns">
              <FeedbackOptions
                options={['good', 'neutral', 'bad']}
                onLeaveFeedback={handleClickFeedback}
              />
            </div>
          </Section>
          <Section id={SectionId2} title={'Statistics'}>
            {totalFeedback > 0 ? (
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={countTotalFeedback()}
                positivePercentage={countPositiveFeedbackPercentage()}
              />
            ) : (
              <Notification message="There is no feedback" />
            )}
          </Section>
        </div>
      </div>
    </>
  );
};

export default App;
