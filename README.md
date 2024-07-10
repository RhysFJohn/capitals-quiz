# Quiz App: Learn Capital Cities

## About

This application helps users learn capital cities around the world by presenting quiz questions. The frontend is build using React and the backend is powered by a serverless Node.js function.

### Features

* Randomly selects a country and presents the user with three options for the capital city.
* Provides feedback on whether the user's selection is correct.
* Allows users to load a new question by clicking a "Restart Quiz" button.

### Prerequisites

* Node.js (<= 18.x)
* npm
* Serverless Framework

## Setup

### Backend Setup

  **1. Install Serverless Framework**
  If you haven't already, install the Serverless Framework globally:

```bash
  npm install -g serverless
```

  **2. Clone the Repository**
  Clone this repository to your local machine:

```bash
    git clone https://github.com/RhysFJohn/capitals-quiz.get
    cd capitals-quiz
```

  **3. Install Dependencies**
  Navigate to the quiz-app-backend directory and isntall the required dependencies

```bash
    cd quiz-app-backend
    npm install
```

  **4. Configure Serverless**

  Ensure you have your AWS credentials configured. You can follow the [Serverless Framework AWS setup guide](https://www.serverless.com/framework/docs-getting-started) if needed.

#### Running Backend locally with Serverless Offline

  **1. Update `serverless.yml`**
    Ensure that the `serverless.yml` file include the Serverless Offline plugin.

```yaml
plugins:
  - serverless-offline
```

  **2. Start Serverless Offline**
    Start Serverless Offline plugin to simulate AWS Lambda and API Gateway locally

```bash
serverless offline
```

  \* Note the endpoint URL provided by **Serverless**

### Frontend setup

**1. Navigate to thee Frontend Directory**

```bash
  cd quiz-app-frontend
```

**2. Install Dependencies**
Install the required dependencies

```bash
  npm install
```

**3. Configure API Endpoint**

Open `quiz-app-frontend/src/Components/QuizComponent.tsx` and update `fetchQuestion` function with the correct API endpoint URL obtained from Serverless Offline.

```typescript
  const fetchQuestion = async () => {
    try {
      const response = await axios.get<Question>("http://your-api-endpoint/question");
      setQuestion(response.data);
      setSelectedOption(null);
      setFeedback("");
    } catch (err) {
      console.error("Error fetching question: ", err)
    }
  };
```

**4. Start the Frontend**
  start the development server:

```bash
    npm start
```

#### Summary

- Use `serverless offline` to run the backend locally
- Use `npm start` in the frontend directory to run the React app

#### Acknowledgements

[countriesAPI](https://countriesnow.space/api/v0.1/countries/capital) for providing the countries and capitals data.
