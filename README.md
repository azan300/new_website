1. websites they already use
2. Start the AWS host I guess
3. We can start with doing a ghantt chart or however it is spelt
4. divide the work and conquer. 

--------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------
Muhamed - Update and work I have doing including all the info 01/29/2025

- I developed the backend and I merged the frontend with the backend by integrated the exsisting frontend with the external storage of mega and MangoDB Atlas (mangoose express)

- we are using Node.js and Express

- For now we are using free-tier both the mega storage and MangoDB, eventually we will need to change it.

- I put my credit card info when I was creating the aws account last year as it was required, 
we are on free-tier mode for one year with few an exception.


- The exception = For the amazon linux Instance we are hosting the website in, we are using Elastic IP address and I believe it's charging us approximately 51 cents for every week. 
We need the Elastic IP addr because everytime we restart or refresh the amazon linux Instance, it's generating new ip addr, then we will have update all the backend with the new ip addr, if that make sense. 
However the Elastic ip addr is steady and never changing unless we change it. Eventually we will need to get domain for the website and replace it with Elastic ip addr.

- The website is hosted at aws ec2 amazon linux instance

- link to the website (Elastic IP addr) PublicIPs: 3.213.204.139

- aws IAM user login info
  Account ID 0433-0936-4613
  Username strightup
  Password Denton321!

- mega storage login info
  MEGA_EMAIL=roofing.company.denton@gmail.com
  MEGA_PASSWORD=Yello.4321!

- mangodb login info
  Username roofing.company.denton@gmail.com
  Password Unt.Yello.321!

-------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------



Muhamed - 09/10/2024
Quick Summary of minor Backend work I did. 
Honestly this is 'rough draft' please let me know if I need to approach it differently and you can go to check it by going
to -Code -choose Codespace -Click on "symmetrical tribble" -On the bottom section there is Terminal bash, run this script 
"node server.js" to test the application. There will be pop-up click on it and it will take you to the website.

And these are what I did in brief summary

1.	I Set Up Node.js and Express:

•	I Initialized a Node.js project and installed required packages, express, mongoose, body parser.

2.	I Set Up MongoDB:

•	I Installed and set up MongoDB, creating a database for folder information, locally, we will make change later.

3.	I Organized Project Structure:

•	Created a structured project folder containing:

	/privite for frontend files (HTML, CSS, JavaScript).

	/models for MongoDB models.

	server.js for the backend Express server.

	package.json for project metadata.


Zach -- reset counter (temporary) 
	1. Go into the website 
	2. Inspect element or f12
	3. navigate to "console" 
	4. paste the following: 
		localStorage.removeItem('jobs');
localStorage.removeItem('jobCounters');

// Reset counters
jobCounters = {
    potentialJobs: 0,
    startedJobs: 0,
    inProgressJobs: 0,
    finalizingJobs: 0,
    finishedJobs: 0
};

// Remove jobs from the DOM
document.querySelectorAll('.job:not(#addJob)').forEach(job => job.remove());

// Update the UI to reflect the reset counters
updateJobCounters();
	
	
	5. Press Enter





















Things we need
1. websites they already use
2. Start the AWS host I guess
3. We can start with doing a ghantt chart or however it is spelt
4. divide the work and conquer. 




Quick Summary of minor Backend work I did. 
Honestly this is 'rough draft' please let me know if I need to approach it differently and you can go to check it by going
to -Code -choose Codespace -Click on "symmetrical tribble" -On the bottom section there is Terminal bash, run this script 
"node server.js" to test the application. There will be pop-up click on it and it will take you to the website.

And these are what I did in brief summary

1.	I Set Up Node.js and Express:

•	I Initialized a Node.js project and installed required packages, express, mongoose, body parser.

2.	I Set Up MongoDB:

•	I Installed and set up MongoDB, creating a database for folder information, locally, we will make change later.

3.	I Organized Project Structure:

•	Created a structured project folder containing:

	/privite for frontend files (HTML, CSS, JavaScript).

	/models for MongoDB models.

	server.js for the backend Express server.

	package.json for project metadata.


Zach -- reset counter (temporary) 
	1. Go into the website 
	2. Inspect element or f12
	3. navigate to "console" 
	4. paste the following: 
		localStorage.removeItem('jobs');
localStorage.removeItem('jobCounters');

// Reset counters
jobCounters = {
    potentialJobs: 0,
    startedJobs: 0,
    inProgressJobs: 0,
    finalizingJobs: 0,
    finishedJobs: 0
};

// Remove jobs from the DOM
document.querySelectorAll('.job:not(#addJob)').forEach(job => job.remove());

// Update the UI to reflect the reset counters
updateJobCounters();
	
	
	5. Press Enter
