import pickle
import json
import numpy as np
__locations = None
__data_columns = None
__model = None



def get_estimated_price(location,sqft,bhk,bath):
    try:
      loc_index = __data_columns.index(location.lower())
    except:
      loc_index=-1
    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk   
    if loc_index >= 0:
        x[loc_index] = True
    return round(__model.predict([x])[0],2)


def get_location_names():
    return __locations


def load_saved_artifacts():
    print("loading saved artifacts...start")
    global __data_columns
    global __locations
    global __model
    with open("d:/PROJECTS/BHP/server2/artifacts/columns.json",'r') as f:
      __data_columns = json.load(f)['data_columns']
      __locations = __data_columns[3:]
    with open("d:/PROJECTS/BHP/server2/artifacts/banglore_home_prices_model.pickle", 'rb') as f:
        __model = pickle.load(f)
    print("Loading Saved Artifacts .. DONe")
if __name__ == '__main__':
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimated_price("1st block jayanagar",1000,3,3))
  