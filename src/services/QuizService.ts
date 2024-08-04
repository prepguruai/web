import { QuizClient } from "../generated/QuizServiceClientPb";
import { Metadata } from "grpc-web";

import { 
    ContestRequest, 
    SubmissionResponse, 
    CandidateResponse,
    QuizQuestion } from "../generated/quiz_pb";

import { SERVICE_HOST, TENANT } from "./constants";

const quizClient = new QuizClient(SERVICE_HOST); 
const authToken = localStorage.getItem('token');
const metadata: Metadata = { 'Authorization': `Bearer ${authToken}` };

async function GetContest() : Promise<QuizQuestion[]> {
    var request = new ContestRequest();
    request.setTenant(TENANT);

    var res = await quizClient.getContest(request, metadata);
    return res.getQuestionsList();
}

async function SubmitAnswer(questionId: string, answer: string) : Promise<SubmissionResponse> {
    var request = new CandidateResponse();
    request.setQuestionhash(questionId);
    request.setAnswer(answer);
    request.setTenant(TENANT);

    return await quizClient.submitQuizAnswer(request, metadata);
}

export { GetContest, SubmitAnswer }