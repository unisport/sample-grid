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

My regular solution
During my time as a student I would use Django to display items, meaning I would get the queryset from the backend in the view code, then use a template loop to display all the items. The JSON file would be imported into a datamodel that fits the data fields of the products, and I would then be able to generate queries from this. In the template I would be able to insert a filter which would use Q functionality to reload the page a generate a new queryset according to filter input.

My posted solution
In my posted solution I'm using only front-end, so I added the JSON file in the main directory. I'm doing most of the work in the Javascript file as I need to add to add the loop there, so I'm extracting the JSON contents into a data array which I can use in the loop.

JS file
The JSON data first is sorted according to discount percentage and has the object with the highest discount first.

The array is then looped through, adding a card for every object. I decided to use Boostrap cards to present the products, mixed in with personal styling.

Inside the card an info box is added in the top left corner which holds the potential discount tag and members only tag. These tags are added in the following.

Following this a product image is added



I can see in the JSON file that there is a max price, a minimum price, and a recommended retail price. The min and max are identical, so I decided to display the max price.

Nexus 4 is weird

