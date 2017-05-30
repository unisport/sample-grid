module ProductApp exposing (..)

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
  }

type alias Product =
  { name : String
  , price : Float
  , price_old : Float
  , image : String
  , url : String
  }

init : (Model, Cmd Msg)
init =
  ({ message = (Just "")
  , products = Nothing
  }, getProducts)


-- update

type Msg
  = Show
  | FetchProducts (Result Http.Error (List Product))

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Show -> 
      (model, Cmd.none)

    FetchProducts result ->
      case result of
        Ok productList ->
          ({model | products = Just productList}, Cmd.none)

        Err error ->
            {-
            let
                errMsg = case error of
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
                ({model | message = errMsg}, Cmd.none)
            -}
            ({model | message = (Just (toString error))}, Cmd.none)

-- view

view : Model -> Html Msg
view model =
  div [ class "container"] [ div [ class "messages" ] [ (showMessage model) ]
    , (productListSection model)
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
      span [] [ text "No products" ]

    Just products ->
      div [ class "row" ] (List.map productSection products)

productSection : Product -> Html Msg
productSection product =
  div [ class "column column-50" ] [ img [ src product.image ] []
    , span [ class (String.join " " ["product-name", (productDiscount product)]) ] [ text product.name ]
    , span [ class "price" ] [ text (toString product.price) ]
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
  Decode.map5 Product
    (Decode.field "name" Decode.string)
    (Decode.field "price" decodeStringToFloat)
    (Decode.field "price_old" decodeStringToFloat)
    (Decode.field "image" Decode.string)
    (Decode.field "url" Decode.string)

decodeStringToFloat : Decode.Decoder Float
decodeStringToFloat =
   Decode.string
   |> Decode.map (\str ->
        (String.join "" (String.split "." str))
   )
   |> Decode.map (\str ->
        (String.join "." (String.split "," str))
   )
   |> Decode.andThen (\str ->
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
