
        var url = "data/datasource.json";


        var SortingOptions = {
            PriceAsc: 1,
            PriceDesc: 2,
            Name: 3
        };

        var FilterOptions = {
            PriceLessThan100: 1,
            PriceBetween100And500: 2,
            PriceMoreThan500: 3,
            DeliveryTops2Days: 4,
            DiscountProducts: 5
        };

        var ProductModel = kendo.data.Model.define({
            id: "id",
            fields: {
                "id": {
                    type: "number"
                },
                "delivery": {
                    type: "string"
                },
                "free_porto": {
                    type: "boolean"
                },
                "img_url": {
                    type: "string"
                },
                "kid_adult": {
                    type: "number"
                },
                "kids": {
                    type: "number"
                },
                "name": {
                    type: "string"
                },
                "package": {
                    type: "boolean"
                },
                "price": {
                    type: "string"
                },
                "price_old": {
                    type: "string"
                },
                "sizes": {
                    type: "string"
                },
                "url": {
                    type: "string"
                },
                "women": {
                    type: "boolean"
                }
            }
        });

        var viewModel = kendo.observable({

            productFilters: [],

            FilterOptions: FilterOptions,

            productDataSource: new kendo.data.DataSource({
                //data: [],
                transport: {
                    read: {
                        url: "data/datasource.json",
                        dataType: "json"
                    }
                },
                pageSize: 12,
                sort: { field: "formatedPrice", dir: "asc" },
                schema: {
                    data: function (response) {

                        var data = response.products;

                        for (var i = 0; i < data.length; i++) {

                            data[i].formatedPrice = viewModel.changeDecimalFormat(data[i].price);
                            data[i].formatedPriceOld = viewModel.changeDecimalFormat(data[i].price_old);
                        }

                        return data;
                    },
                    total: function(response) {
                        return response.products.length;
                    },
                    model: ProductModel                    
                },
            }),

            selectedSorting: SortingOptions.PriceAsc,

            sortDataSource: new kendo.data.DataSource({
                data: [
                    { "name": "Price ascending", "value": SortingOptions.PriceAsc, "sort_order": 2 },
                    { "name": "Price descending", "value": SortingOptions.PriceDesc, "sort_order": 3 },
                    { "name": "Name", "value": SortingOptions.Name, "sort_order": 1 }
                ],
                sort: { field: "sort_order", dir: "asc" }
            }),

            onSortingChange: function (e) {

                if (this.selectedSorting == SortingOptions.Name) {
                    this.productDataSource.sort({ field: "name", dir: "asc" });
                }
                else if (this.selectedSorting == SortingOptions.PriceAsc) {
                    this.productDataSource.sort({ field: "formatedPrice", dir: "asc" });
                }
                else if (this.selectedSorting == SortingOptions.PriceDesc) {
                    this.productDataSource.sort({ field: "formatedPrice", dir: "desc" });
                }
            },

            onCheckBoxSelect: function (e) {
                var priceFilter = {
                    logic: "or",
                    filters: []
                };

                var deliveryFilter = {
                    logic: "and",
                    filters: []
                };

                var discountFilter = {
                    logic: "and",
                    filters: []
                };

                for (var i = 0; i < this.productFilters.length; i++) {
                    var filter = this.productFilters[i];

                    switch (filter) {
                        case FilterOptions.PriceLessThan100:
                           priceFilter.filters.push({ field: "formatedPrice", operator: "lte", value: 100 });
                           break;

                        case FilterOptions.PriceBetween100And500:
                            var middlePriceFilter = {
                                logic: "and",
                                filters: []
                            };
                            middlePriceFilter.filters.push({ field: "formatedPrice", operator: "gte", value: 100 });
                            middlePriceFilter.filters.push({ field: "formatedPrice", operator: "lte", value: 500 });
                            priceFilter.filters.push(middlePriceFilter);
                            break;

                        case FilterOptions.PriceMoreThan500:
                            priceFilter.filters.push({ field: "formatedPrice", operator: "gte", value: 500 });
                            break;

                        case FilterOptions.DeliveryTops2Days:
                            deliveryFilter.filters.push({ field: "delivery", operator: "eq", value: "1-2 dage" });
                            break;

                        case FilterOptions.DiscountProducts:
                            discountFilter.filters.push({ field: "formatedPriceOld", operator: "gt", value: 0 });
                            break;


                    }
                }

                var filter = {
                    logic: "and",
                    filters: []
                };

                if (priceFilter.filters.length > 0) {
                    filter.filters.push(priceFilter);
                }

                if (deliveryFilter.filters.length > 0) {
                    filter.filters.push(deliveryFilter);
                }

                if (discountFilter.filters.length > 0) {
                    filter.filters.push(discountFilter);
                }
    
                this.productDataSource.filter(filter);
				
				$(e.target.parentNode).removeClass("k-state-selected").removeClass("k-state-focused");
            },

            changeDecimalFormat: function (value) {

                var stringValue = value.toString();
                var stringValueWithDot = stringValue.replace('.', '').replace(',', '.');
                var valueWithDot = parseFloat(stringValueWithDot);
                return valueWithDot;
            }
        });

        kendo.bind($("#content"), viewModel);

