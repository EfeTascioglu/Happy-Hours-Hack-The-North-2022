import cohere
import requests
import smtplib



co = cohere.Client('Dbv19fLVO2RpG0HfwdaDIEQlHt2svAsebFq3WgG0', '2021-11-08')



'''
def cohere_testing_stuff_out():

    response = co.generate(prompt='Once upon a time in a magical land called')

    print('Prediction: {}'.format(response.generations[0].text))

    response = co.embed(texts=["hello", "goodbye"])
    print('Embeddings: {}'.format(response.embeddings))

    response = co.classify(
    inputs=["this movie was great", "this movie was bad"],
    examples=[Example("love this movie", "positive review"), Example("I would watch this movie again with my friends", "positive review"), Example("I would watch this movie again", "positive review"), Example("i liked this movie", "positive review"), Example("this is my favourite movie", "positive review"), Example("worst movie of all time", "negative review"), Example("I would not recommend this movie to my friends", "negative review"), Example("I did not want to finish the movie", "negative review"), Example("hate this movie", "negative review"), Example("we made it only a quarter way through before we stopped", "negative review"), Example("this movie was okay", "neutral review"), Example("this movie was neither amazing or terrible", "neutral review"), Example("I would not watch this movie again but it was not a waste of time", "neutral review"), Example("this movie lacked any originality or depth", "neutral review"), Example("this movie was nothing special", "neutral review")])
    print('The confidence levels of the labels are: {}'.format(response.labels))

    response = co.tokenize(text='tokenize me! :D')
    print('The tokens are: {}'.format(response.tokens))

    response = co.detokenize(tokens=[10104,12221,1315,34,1420,69])
    print('The text is: {}'.format(response.text))

    return None
'''

# Goal: recommend an activity, then location, then possibly itinerary of what to do 
# based on text input (text messages aggregated from a group of friends)
# Input: string of text representing the text messages
# Output: 
#   1. activity/ies recommendation     (string)
#   2. locations recommendation        (?) -> use Google Maps API
#   3. duration of each activity recommendation  (dict?)
#   4. itinerary recommendation, taking into account travel time, but not the travel itself (list?)

# Main Cohere things I'll need:
#  1. Entity extraction
#  2. Finetuning

text = "I want to go eat ice cream it's sunny I think we should go to the beach nearby"
text_complex = "I want to go to the beach and eat ice cream sounds good but I don't want to go to the beach and I'm gluten free"
messages = """
- Let's go on rollercoasters
- Yeah sounds good! We'll have enough time left, how about we watch a movie?"""
text_2 = f"""
Chat messages:
- I want to go to the beach and eat ice cream
- sounds good but I don't want to go to the beach and I'm gluten free

Activities: eat ice cream
--
Chat messages:
- How about we go to the park and play board games?
- I like board games but I'd rather stay at home
- Let's have drinks too

Activities: play board games, have drinks
--
Chat messages:
{messages}

Activities:"""
location = []
itinerary = {}

def activity_recommendation(text): 
    '''possibilities:
    1) extract fundamental activities from text, then use that output as input for
    determining an activity that can be done, using ENTITY EXTRACTION
    https://docs.cohere.ai/entity-extraction
    - but what if someone doesn't want to do something? meh, option 2 is probably better

    2) text summarization with a prompt such as...
    "In summary, we should ______", could also try to factor in the number of 
    activities or time constraints + also considering prompt engineering (before & after input text)
    https://docs.cohere.ai/text-summarization-example

    Decision: option 2, if time option 1
    '''
    response = co.generate(prompt='These are the ideas we brainstormed to hang out.' + text + 'In summary, the perfect way to hang out would be to do these activities:')
    activity = response.generations[0].text
    return activity # ('Prediction: {}'.format(response.generations[0].text))

def activity_to_list(activity):
    response = co.generate(prompt='In' + activity + 'these are the activities as a list:')
    activity_list = response.generations[0].text
    # list of activities, iterate through
    return activity_list # eg. ["kayaking", "ice cream"]


# list of activities in their order

def location_recommendation(activity): # do a nearby search

    # Extract entities from text
    # Use entity to recommend location
    # Return location recommendation
    return None

def itinerary_recommendation(activity, location):
    # Extract entities from text
    # Use entity to recommend itinerary
    # Return itinerary recommendation
    return None


# if time: find a way to consider FINETUNING: https://docs.cohere.ai/finetuning-wiki 

if __name__ == "__main__":
    for i in range(5):
        # print("Activity is:" + str(activity_recommendation(text)))
        print("as a list:" + str(activity_to_list(activity_recommendation(text))))
        print(str(i) + "=====================================")
