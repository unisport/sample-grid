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
      }
    , getProducts
    )



-- update


type Msg
    = FetchProducts (Result Http.Error (List Product))
    | AddToCart Product
    | RemoveFromCart Product


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
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
    div [ class "container" ]
        [ div [ class "messages" ] [ showMessage model ]
        , div [] [ showCartSection model.cart ]
        , productListSection model
        ]


showCartSection : Cart -> Html Msg
showCartSection cart =
    div []
        [ div [] [ text "Your cart" ]
        , ul [] (List.map showCartProduct cart.products)
        , div []
            [ span [] [ text "Total:" ]
            , span [] [ text (toString cart.total) ]
            ]
        ]


showCartProduct : Product -> Html Msg
showCartProduct product =
    li []
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
            div [ class "product-list" ] [ text "No products" ]

        Just products ->
            div [ class "product-list" ] (List.map productSection products)


productSection : Product -> Html Msg
productSection product =
    div [ class "product" ]
        [ img [ src product.image ] []
        , span [ class (String.join " " [ "product-name", productDiscount product ]) ] [ text product.name ]
        , span [ class "product-price" ] [ a [ href product.url ] [ text (toString product.price ++ " Dkk") ] ]
        , span [] [ button [ onClick (AddToCart product) ] [ text "add to cart" ] ]
        ]


productDiscount : Product -> String
productDiscount product =
    if product.price < product.price_old then
        "has-offer"
    else
        ""



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
