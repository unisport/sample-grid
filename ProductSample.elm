module ProductSample exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode as Decode
import String


-- Model


type alias Model =
    { message : Maybe String
    , products : Maybe (List Product)
    , cart : Cart
    , sort : String
    }


type alias Cart =
    { total : Float
    , products : List Product
    }


type alias Product =
    { name : String
    , price : Float
    , price_old : Float
    , image : String
    , url : String
    , id : String
    }


init : ( Model, Cmd Msg )
init =
    ( { message = Just ""
      , products = Nothing
      , cart = { total = 0.0, products = [] }
      , sort = "asc"
      }
    , getProducts
    )



-- update


type Msg
    = FetchProducts (Result Http.Error (List Product))
    | AddToCart Product
    | RemoveFromCart Product
    | SortByPrice String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SortByPrice sort ->
            let
                sorter =
                    if model.sort == "asc" then
                        "desc"
                    else
                        "asc"
            in
            ( { model
                | sort = sorter
              }
            , Cmd.none
            )

        AddToCart product ->
            let
                currentCart =
                    model.cart

                currentTotal =
                    model.cart.total

                updatedCart =
                    { currentCart
                        | products = currentCart.products ++ [ product ]
                        , total = currentTotal + product.price
                    }
            in
            ( { model | cart = updatedCart }, Cmd.none )

        RemoveFromCart product ->
            let
                currentCart =
                    model.cart

                currentTotal =
                    model.cart.total

                updatedCart =
                    { currentCart
                        | products = List.filter (\p -> p.id /= product.id) currentCart.products
                        , total = currentTotal - product.price
                    }
            in
            ( { model | cart = updatedCart }, Cmd.none )

        FetchProducts result ->
            case result of
                -- Request went well and a list was returned
                Ok productList ->
                    ( { model | products = Just productList }, Cmd.none )

                Err error ->
                    -- Error handling
                    let
                        errMsg =
                            case error of
                                Http.BadPayload msg response ->
                                    Just "Bad Payload"

                                Http.BadUrl url ->
                                    Just "Bad URL"

                                Http.Timeout ->
                                    Just "Timeout"

                                Http.NetworkError ->
                                    Just "Network error"

                                Http.BadStatus status ->
                                    Just "Bad status"
                    in
                    ( { model | message = errMsg }, Cmd.none )



-- view


view : Model -> Html Msg
view model =
    let
        sortText =
            if model.sort == "asc" then
                "Sort price lowest"
            else
                "Sort price highest"
    in
    div [ class "container" ]
        [ div [ class "messages" ] [ showMessage model ]
        , div [] [ button [ onClick (SortByPrice model.sort) ] [ text sortText ] ]
        , div [] [ showCartSection model.cart ]
        , productListSection model
        ]


showCartSection : Cart -> Html Msg
showCartSection cart =
    div []
        [ div [] [ text "Your cart" ]
        , div [] (List.map showCartProduct cart.products)
        , div [ class "cart-items" ]
            [ span [] [ text "Total:" ]
            , span [] [ text (toString cart.total) ]
            ]
        ]


showCartProduct : Product -> Html Msg
showCartProduct product =
    div []
        [ span [] [ text product.name ]
        , span [] [ text (toString product.price) ]
        , button [ onClick (RemoveFromCart product) ] [ text "Remove" ]
        ]


showMessage : Model -> Html Msg
showMessage model =
    case model.message of
        Nothing ->
            span [] []

        Just message ->
            span [] [ text message ]


productListSection : Model -> Html Msg
productListSection model =
    case model.products of
        Nothing ->
            div [ class "products-container" ] [ text "No products" ]

        Just products ->
            div [ class "products-container" ]
                [ ul [ class "products" ]
                    (List.map productSection (sortByPrice model.sort products))
                ]


sortByPrice : String -> List Product -> List Product
sortByPrice sorter products =
    if sorter == "asc" then
        List.sortBy .price products
    else
        List.reverse (List.sortBy .price products)


productSection : Product -> Html Msg
productSection product =
    -- Add let/in
    let
        discount =
            if product.price < product.price_old then
                "%"
            else
                ""
    in
    li []
        [ div [ class "product" ]
            [ div [ class "splash" ] [ text discount ]
            , div [ class "image-wrap" ]
                [ img [ src product.image ] []
                ]
            , div [ class "name-wrap" ]
                [ span [] [ text product.name ]
                ]
            , div [ class "price-wrap" ]
                [ span [ class "price" ] [ text (toString product.price) ]
                , span [ class "currency" ] [ text "Dkk" ]
                ]
            , div [ class "button-wrap" ]
                [ button [ onClick (AddToCart product) ] [ text "Add to Cart" ]
                ]
            ]
        ]



-- HTTP


getProducts : Cmd Msg
getProducts =
    Http.send FetchProducts (Http.get "/sample.json" productListDecoder)


productListDecoder : Decode.Decoder (List Product)
productListDecoder =
    Decode.field "products" (Decode.list productDecoder)


productDecoder : Decode.Decoder Product
productDecoder =
    Decode.map6 Product
        (Decode.field "name" Decode.string)
        (Decode.field "price" decodeStringToFloat)
        (Decode.field "price_old" decodeStringToFloat)
        (Decode.field "image" Decode.string)
        (Decode.field "url" Decode.string)
        (Decode.field "id" Decode.string)


decodeStringToFloat : Decode.Decoder Float
decodeStringToFloat =
    Decode.string
        |> Decode.map
            (\str ->
                String.join "" (String.split "." str)
            )
        |> Decode.map
            (\str ->
                String.join "." (String.split "," str)
            )
        |> Decode.andThen
            (\str ->
                case String.toFloat str of
                    Ok float ->
                        Decode.succeed float

                    Err err ->
                        Decode.fail err
            )



-- main


main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
