Fork this project and send back a pull request.

1. Display these products https://www.unisport.dk/api/products/batch/?list=179249,179838,174351,180011,180020,178429 in a responsive grid, it has to fit on to mobile and desktop. How much information you show pr product is up to you
2. Sort the products based on discount, lowest discount at the top
3. All prices should be formated in DKK currency

### What we look for?

When we review your pull request we look at how the code has been structured and which libraries you decide to use. There is no right or wrong when it comes to choice in CSS or JavaScript frameworks or libraries

#### How to fork

https://help.github.com/articles/fork-a-repo/ 

#### How to do a pull-request

https://help.github.com/articles/using-pull-requests/


Solution by Andreas Christensen

# My "normal" solution
During my time as a student I would use Django (full-stack), meaning I would get the queryset from the backend in the view code, then use a template loop to display all the items. The JSON file would be imported into a datamodel that fits the data fields of the products, and I would then be able to generate queries from this.

# My posted solution
In my posted solution I'm using only front-end, so I'm not using Django functionality. I added the JSON file in the main directory. I'm doing most of the work in the Javascript file as I need to add the loop there, so I'm extracting the JSON contents into a data array which I can use in the loop. I'm using bootstrap, but I'm also adding my own styling on top for personal tweaks.

I decided that bootstrap cards would be fitting to display the products, and to this I'm adding a box-shadow on each card to make them look more appealing.

I have included a bootstrap navbar in the top using the same green color as the heading and the price. The content is the same as on the UniSport webpage. Also in the bottom a simple footer is present with links to standard social media and also my own GitHub profile.

The product information used in the cards are as follows:
- Discount percentage (if any), added to the top left corner.
- Member's only tag (if any), added to the top left corner. Comes second to discount (is present)
- Product image, top center of the card, takes up about half of the card.
- Product title, underneath image, centered, shortened at 40 chars
- Price - if discounted then price minus discount. Centered under title, green color that matches navbar/discount
- Old price - is added if discount is applied. Under price, text is muted and crossed out.
- Sizes available - if more than 45 chars then replaced by standard sentence. Sizes is bold, following text is normal.

The styling is simple and the products follow a rounded and centered theme. Each product has a light hover effect which moves it 5px up.

## HTML file
In the head of the HTML file I have included links to bootstrap, the css file, google fonts using Lato, font-awesome for icons and JQuery min version.

Boostraps navbar is at the top of the body.

A button element is under the navbar. It's position is fixed on the screen and can be placed anywhere.

Following the navbar comes a container which holds all the product content. At the top is a row with a col and a h1 header with the page title.

Underneath is another row with an intro text in a paragraph. The paragraph is centered.

Below is the row that holds all the cards. All cards are generate using JavaScript so the row is empty here except for the ID used for JavaScript.

Underneath is the footer.

At the bottom of the body is the script which references the JavaScript file. Additionally there is a script tag which holds the code for the back-to-top button, which is shown after user has scrolled 100px down, and which disappears at the top.

## JSON file
The JSON file is copied from the dataset used for this test:
https://www.unisport.dk/api/products/batch/?list=200776,223466,217763,217769,213591,223214,217706,222189,213590,222649,200777,225707,225811,198079,222191,226547,213576,223226,223002,217710,226546,217740,226350,190711,217758,226542,222824,222192,225701,226114,202481,225705,222316,233943,223191,222314,206016,226102,222822,213587

## CSS file
The CSS holds styling used for the different parts of the card as well as additional styling for bootstrap elements.

At the bottom media queries are used. Bootstraps own media queries are matched, but there are also my own breakpoints for the smallest screen sizes in order to cater to the smallest phones. The smallest width I have adjusted for is 240px.

## JS file
The JSON data first is sorted according to discount percentage and has the object with the highest discount first.

Loop is started for each product, each loop creates a card which is added to a div, which is then added to the product row.

Inside the card an info box is added in the top left corner which holds the potential discount tag and members only tag. The tags are added in the following if they exist or qualify.

Following this a product image is added. I'm using bootstraps image classes to handle media queries.

The card body is added.

In the card body I'm adding the title. The title is cut short and has "..." inserted if it exceeds 45 characters

If discount is present then discount is subtracted from price before being added. It is also rounded down to no decimals.
- I can see in the JSON file that there is a max price, a minimum price, and a recommended retail price. I decided to display the recommended retail price.

Sizes are then added. I'm adding one paragraph with sizes written in bold and with a new line. Following this I loop through the sizes of each object and add them. If it's the last item I'm not adding the comma and space.
