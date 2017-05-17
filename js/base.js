$(function() {

    // Needed to copy & paste sample datas to file, because of crosssite restrictions.
    // Otherwise this could be handled with json or jsonp, to live fetch datas from the base url or even another api / url
    //
    // Normally i will pack all code to optimize it, but i guess you guys need to read what i have done ;)
    //
    // Fetching JSON product data
    //
    // I tryed to find a way to bypass the crosssite restrictions, and i found out that yahoo query language (yql)
    // could do the trick, by scraping the page and load the json live.
    //
    $.getJSON('products.json', function(data){ // Normal approach if loading from a json file

    // But we can also scrape and load the page through yahoos crawling api to live fetch the sites json data
    // $.getJSON('http://query.yahooapis.com/v1/public/yql', {
    //          q: 'SELECT * FROM json WHERE url="https://www.unisport.dk/api/sample/"',
    //          format: 'json'
    //      }, function(data){

            // Looping through products
            $.each(data.products, function(i, e){

                // Only fetch data row if online ( Assuming row named 'online' is a online- hide / show function ? )
                if(e.online == 1){

                    // Splitting product sizes into pices
                    var sizes   = e.sizes.split(','),
                        sizesUl = '<ul>'
                        typesUl = '<ul>';

                            // Generating product sizes list
                            $.each(sizes, function(i, e){
                                sizesUl += '<li>' + e.trim() + '</li>';
                            });

                                // Collecting model types
                                // Kids
                                if(e.kids == 1){
                                    typesUl += '<li>Barn</li>';
                                }

                                // Kid-Adult
                                if(e.kid_adult == 1){
                                    typesUl += '<li>Teenager</li>';
                                }

                                // Women
                                if(e.women == 1){
                                    typesUl += '<li>Kvinde</li>';
                                }

                        sizesUl += '</ul>';
                        typesUl += '</ul>';

                                    // Html product row template 
                                    var template = '<tr>'+
                                                        '<td class="np"><a href="' + e.img_url + '"><img src="' + e.image + '" width="100%"></a></td>' +
                                                        '<td class="c">' + e.id + '</td>' +
                                                        '<td><a href="' + e.url + '">' + e.name + '</a></td>' + // Adding product model types and referral link
                                                        '<td>' + typesUl + '</td>' + // Adding product types
                                                        '<td>' + ((sizes != 0) ? sizesUl : '') + '</td>' + // Adding product sizes
                                                        '<td>' +
                                                            '<ul>' +
                                                                // Enables "before discount" price if any
                                                                ((e.price_old != '0,00') ? '<li><s class="discount">' + e.price_old + ' ' + e.currency + '</s></li>' : '' ) +
                                                                '<li>' + e.price + ' ' + e.currency + '</li>' +
                                                            '</ul>' +
                                                        '</td>' +
                                                        '<td class="c">' + e.delivery + '</td>' +
                                                        '<td class="c">' + ((e.is_customizable != 0) ? 'Ja' : 'Nej') + '</td>' +
                                                        '<td class="c">' + ((e.package != 0) ? 'Ja' : 'Nej') + '</td>' +
                                                   '</tr>';

                                        // Appending product row to <tbody>
                                        $('tbody').append(template);

                                            console.log(e);
            }
        });

            // Adding datatable to products div
            $('#products').DataTable({
                // Danish language setup
                language: {
                    sProcessing:       'Henter...',
                    sLengthMenu:       'Vis _MENU_ produkter',
                    sZeroRecords:      'Ingen produkter matcher s&oslash;gningen',
                    sInfo:             'Du ser _START_ til _END_ af _TOTAL_ produkter',
                    sInfoEmpty:        'Du ser 0 til 0 af 0 produkter',
                    sInfoFiltered:     '(filtreret fra _MAX_ produkter)',
                    sSearch:           '_INPUT_',
                    searchPlaceholder: 'Søg efter produkter her',
                    oPaginate: {
                        sFirst:    'F&oslash;rste',
                        sPrevious: 'Forrige',
                        sNext:     'N&aelig;ste',
                        sLast:     'Sidste'
                    }
                },

                // Setting the table responsive
                responsive: true,

                // Disables row ordering ( Could be activated for price sorting )
                ordering: false,

                // Adding custom page load options for the dropdown menu
                lengthMenu: [[5, 10, 15, 20], [5, 10, 15, 20]],

                // Adjusting row width
                columns: [
                    { 'width': '25%' },
                    { 'width': '5%'  },
                    { 'width': '25%' },
                    { 'width': '10%' },
                    { 'width': '17%' },
                    { 'width': '11%' },
                    { 'width': '5%'  },
                    { 'width': '1%'  },
                    { 'width': '1%'  }
                ]
            });

    });
});