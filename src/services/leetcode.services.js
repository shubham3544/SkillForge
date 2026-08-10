import { ApiError } from "../utils/ApiError.js";



const LEETCODE_GRAPH_URL = "https://leetcode.com/graphql";

const getLeetCodeStats = async (username) => {

    if(!username?.trim())
    {
        throw new ApiError("LeetCode username is required");
    }


    const query = `
    query userProblemSolved($username :String!) {
       allQuestionsCount {
        difficulty
        count
       }

       matchedUser(username: $username) {
         submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
         }
       }
    }
 `;

 const resonse = await fetch(LEETCODE_GRAPH_URL, {
     method: "POST",
     headers: {
      "Content-Type": "application/json",
     },
     body: JSON.stringify({
       query,
       variables: {
         username: username.trim(),
       },
     }),
 });

const result = await resonse.json();

if (result.errors) {
   

    throw new Error("Failed to fetch LeetCode data");
}

if(!result.data?.matchedUser) {
   throw new Error("LeetCode user not found");
}

const solved = result.data.matchedUser.submitStatsGlobal.acSubmissionNum;

const stats = {
   totalSolved: 0,
   easy: 0,
   medium: 0,
   hard: 0,
};

solved.forEach((item) => {

   if(item.difficulty === "All")
   {
      stats.totalSolved = item.count;
   }

   if(item.difficulty === "Easy")
   {
      stats.easy = item.count;
   }

   if(item.difficulty === "Medium")
   {
      stats.medium = item.count;
   }

   if(item.difficulty === "Hard")
   {
      stats.hard = item.count;
   }
});

return stats;

};


export {
   getLeetCodeStats,
};

