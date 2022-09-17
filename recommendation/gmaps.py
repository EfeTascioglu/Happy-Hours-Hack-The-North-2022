import googlemaps

gmaps_api_key = "AIzaSyBY4Qmdc6v9TWG3RAWLRRx4fZh8zu968Rg"
map_client = googlemaps.Client(key=gmaps_api_key)

def miles_to_meters(miles): # necessary?
    return miles * 1609.34

name_from_the_something_something = "Italian restaurant"

location_name = name_from_the_something_something
response = map_client.places(query = location_name)


location = (43.4763752178891, -80.55232644074553)
search_string = 'ramen'
distance = miles_to_meters(15)
business_list = []

response = map_client.places_nearby(location=location, keyword=search_string, name='ramen shop', radius=distance)

# business_list.extend(response.get())

# next_page_token = response.get('next_page_token')

