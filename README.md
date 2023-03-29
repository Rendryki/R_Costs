# **COSTS**💰
This project is a Single Page Application developed in React!

## How does it works?
It consists in a Project Financial Assistant, where the user can insert all the financial expenses already spent or predicted to be spent in one or more projects.

Basically, it is a ToDo list that allows only financial information to be inserted. It is splitted in two main sections, the first one is where the user insert the information and create each expense or budget. The second section shows the cards already created and allows the user to edit or delete any created card. 

## How was it developed?
It was totally developed using React. The working pages are navigated through React Router, which splits the SPA into two main working pages, the 'Home', where the cards can be created, and the 'Projetos', where all cards can be seen, edited or deleted. The other remaining pages are empty and was just created for visual matters.

The data from each card created, editted or deleted, is fetched from a local JSON database. The local database keep all the information from the creating or editing card activities and set the data in the DB through a 'POST' method. Then, to show the necessary information and data, it fetches the same database through a 'GET' method and shows the user all of the cards and information inserted.

The page stilization is done by CSS modules from each page or component of the SPA.

It was fully developed with the aid of the free react basic mini-course provided by the Youtube channel 'Matheus Battisti - Hora de Codar'. The entire course playlist can be found at the following URL: https://www.youtube.com/playlist?list=PLnDvRpP8BneyVA0SZ2okm-QBojomniQVO
