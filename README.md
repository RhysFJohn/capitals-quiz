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


## Implementation Details

### Frontend

#### Libraries Used

* **React** : A JavaScript library for building user interfaces.
* **axios** : A promise-based HTTP client for making API requests.
* **TypeScript** : Provides static typing for JavaScript, ensuring better development experiences and fewer runtime errors.

#### Components

* **QuizComponent** : The main component responsible for displaying the quiz question, options, and feedback.

#### State Management

* **question** : Stores the current question object received from the backend.
* **selectedOption** : Stores the option selected by the user.
* **feedback** : Stores the feedback message based on the user's selection.
* **answered** : Tracks whether the user has answered the current question.

#### Data Flow

1. **Fetching Data** : The `fetchQuestion` function uses `axios` to make a GET request to the backend API endpoint to fetch a new question.
2. **Rendering Data** : The fetched question is stored in the `question` state and rendered by the component.
3. **Handling User Input** : When a user selects an option, the `handleOptionClick` function updates the `selectedOption` and `feedback` states, and marks the question as answered.
4. **Feedback and Highlighting** : Based on the user's selection, feedback is provided, and the correct answer is highlighted.

### Backend

#### Libraries Used

* **axios** : Used for making HTTP requests to external APIs.
* **Serverless Framework** : Used to define and deploy the serverless functions.

#### Functions

* **getQuestion** : Fetches data from the API and generates a quiz question.

#### Data Flow

1. **Fetching Countries Data** : The `getQuestion` function makes an HTTP GET request to the CountriesNow API to fetch the list of countries and their capitals.
2. **Generating Question** : A random country is selected, and multiple options are generated, including the correct capital city.
3. **Returning Question** : The question and options are returned to the frontend as a JSON response.

### Error Handling Strategies

* **Frontend** :
* **API Request Errors** : Errors during API requests are caught using a try-catch block, and an error message is logged to the console.
* **Loading State** : A loading message is displayed while fetching data to enhance user experience.
* **Backend** :
* **API Request Timeout** : The `axios` request to the CountriesNow API includes a timeout setting to prevent hanging requests.
* **Error Responses** : If an error occurs during data fetching, the backend returns a 500 status code with an error message.

#### Acknowledgements

[countries API](https://countriesnow.space/api/v0.1/countries/capital) for providing the countries and capitals data.
