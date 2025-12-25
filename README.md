# Hack the North 2022 Project

## Demo
[![Hack the North 2022 Happy Hours Demo](https://img.youtube.com/vi/RgUfKkbusOI/0.jpg)](https://www.youtube.com/watch?v=RgUfKkbusOI)

## Inspiration
The inspiration behind Happy Hours stems from the question “How can we make getting people together more convenient?”. The biggest roadblock for many organizers is people not being available regularly to communicate, and managing the many different interests of those involved.

By helping people plan better events, as well as sharing the responsibility for organization we hope to improve the depth of connection people have with those already around them.

## What it does
Happy Hours streamlines the social planning experience through the automation of activity recommendations and scheduling suggestions in a collaborative environment. Users can access the plans at their discretion and no longer have the burden of organizing a fun day onto one person.

It takes in activity inputs from users and generates recommendations based on the inputs of the group. It also uses location information to determine reasonable travel distances and schedules activities accordingly.

The collaborative aspect of it stems from multiple users being able to edit the itinerary, as well as leave comments/suggestions for events (such as notices of allergies or other dietary restrictions)

## How we built it
Happy Hours was built using a collage of different APIs and frameworks. The primary component of Happy hours is natural language processing (NLP) to transform things you want to do into events and locations. Happy Hours uses the Co:Here API to transform desires such as “I want to eat shawarma” into practical places that you can attend.

Next, Happy Hours uses the Google Maps API to pin its location, and uses Co:Here API to generate a description of the location using natural language processing. Happy Hours also uses react to allow multi-person collaboration, and uses CockroachDB to store information in a secure & decentralized manner.

Throughout, Happy Hours uses a variety of programming languages and frameworks. Besides the aforementioned Co:Here and CockroachDB, Happy Hours is built using Python, Node JS, React, Flask, Socket, Heroku, and many other systems in order to create a seamless product.

## Challenges we ran into
We ran into many challenges while working on this project. The first hurdle that we had to overcome was the use of APIs, as many of us were unfamiliar with them. We spent hours reading documentation and debugging error messages to achieve our vision. Due to the sheer size of the project, we also had difficulty bringing together many of its components. We had to create dockers and create our own APIs in order to connect independent pieces of the project, and we had to be creative in solving problems to knit together our project.

## Accomplishments that we're proud of
The team had very different stacks and had to find an idea where we could all contribute to. This project was also larger than anything that we have worked on before, we put in a lot of work and lost a lot of sleep to have a product that functioned close to what we had set out to accomplish.

A very rewarding moment that each team member had was the excitement that came from finally solving an issue that they had been stumped on for hours and sharing the success with teammates.

For the product that we produced given the constraints and timelines, we are very proud of how close we had to the original vision. All members were very passionate about the project, and everyone pulled beyond their weight to have completed this project.

## What we learned
We learned the importance of scoping and inter-framework the hard way, but through it we were able to experience the challenges and triumphs working with a variety of new tools and their applications. We learned how to use so many new tools like Co:here, CockroachDB, Heroku, Google Maps API, etc, and how to create a project given tight time constraints.

## What's next for Happy Hours
In the future we want to improve the activity selection of Happy Hours to also relate search tags to each other to find the best ranked activity among the users. Advancing the intelligence of the scheduling capabilities to consider travel distance, as well as more accurate activity duration estimates is also an upgrade we would like in the future for Happy Hours.

## See devpost submission:
Find details on devpost: https://devpost.com/software/happy-hours-0r85nd
