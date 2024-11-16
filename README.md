# Candidate Viewer and Referral Webpage

## Purpose

This webpage is designed to connect talented individuals with hiring professionals in Bangalore. As I come across potential hiring opportunities, this platform helps me refer my friends to these folks, showcasing their skills and experiences in an organized way. 

## How to Add Your Profile

If you would like to be considered for referrals through this platform, follow these steps to add your profile to the `data.json` file:

1. **Fork this Repository**:
   - Click the "Fork" button at the top right corner of this repository on GitHub.

2. **Edit the `data.json` File**:
   - Add your profile details in the following format:
   ```json
   {
       "id": "<unique_id>",
       "name": "<Your Full Name>",
       "email": "<Your Email>",
       "yoe": "<Years of Experience>/0 if none",
       "role": "<Your Role>",
       "resume": "<Link to Your Resume>",
       "canJoinIn": "<Joining Timeline>/can be immediate",
       "lookingFor": "<Type of Opportunity: Internship/Full Time or Both, please refer existing examples>",
       "status": "<Active/Inactive>",
       "experience": [
           {
               "company": "<Company Name>",
               "yoe": "<Years of Experience at the Company>",
               "role": "<Your Role at the Company>"
           }
       ],
       "skills": [
           "<Skill 1>",
           "<Skill 2>"
       ],
       "expertise": [
           "<Expertise 1>",
           "<Expertise 2>"
       ]
   }
   ```
   - Ensure the format is consistent with the existing entries.
   - Keep the `id` unique and increment it by 1 for each new entry.
   - Leave experience empty if you don't have any.

3. **Commit and Push Your Changes**:
   - Save the updated `data.json` file and commit the changes to your forked repository.

4. **Raise a Pull Request (PR)**:
   - Go to your forked repository and click on the **"Pull Request"** tab.
   - Click **"New Pull Request"** and compare your branch with the original repository’s branch.
   - Add a description of your changes and click **"Create Pull Request"**.

5. **Wait for Approval**:
   - Your PR will be reviewed, and once approved, your profile will be added to the platform.

---

Feel free to reach out if you have any questions or need assistance adding your profile. Together, let’s connect talent with opportunities! 😊