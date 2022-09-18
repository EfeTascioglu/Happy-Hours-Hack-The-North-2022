import cohere

co = cohere.Client('Dbv19fLVO2RpG0HfwdaDIEQlHt2svAsebFq3WgG0', '2021-11-08')

input_chat_messages = ["let's go for a walk", "I agree", "then let's eat dinner", "sure, make it Italian"] # inputted from Andrew

def activity_recommendation(text): 
    '''
    Returns a list of recommended activities based on a group chat conversation.
    '''

    text = '\n'.join(['- ' + element for element in text])
    full_input = 'Chat messages:\n' + text + '\nActivities based on the chat messages:'
    
    examples = '''
    Chat messages:
    - I want to go to the beach and eat ice cream
    - sounds good
    - great!
    Activities: go to the beach, eat ice cream
    -----
    Chat messages:
    - How about we go to the park and play board games?
    - I like board games but I'd rather stay at home
    - Let's have drinks too
    Activities: play board games, have drinks
    -----
    '''

    full_prompt = examples + full_input 

    response = co.generate(prompt = full_prompt, max_tokens=50, stop_sequences=['-----']) 

    activity = response.generations[0].text
    activity_intermediate = activity.splitlines()[0]
    activity_list = activity_intermediate.split(', ')
    
    return activity, activity_list # ('Prediction: {}'.format(response.generations[0].text))

def location_recommendation(activity): # do a nearby search
    return None

def itinerary_recommendation(activity, location):
    return None

# testing consistency of output
'''
if __name__ == "__main__":
    for i in range(5):
        print(activity_recommendation(input_chat_messages))
        print(str(i) + "=====================================")
'''

# if time: find a way to consider fine tuning: https://docs.cohere.ai/finetuning-wiki 

