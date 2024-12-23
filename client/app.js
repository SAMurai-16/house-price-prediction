function getLocations() {
    console.log("Document loaded, fetching locations...");
    
    $.get("http://127.0.0.1:5000/get_location_names", function(data, status) {
        console.log("Data received from server:", data);

        if (data && data.locations) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            
            if (!uiLocations) {
                console.error("uiLocations element not found!");
                return;
            }

            $('#uiLocations').empty(); // Clear the dropdown
            locations.forEach(location => {
                var opt = new Option(location);
                $('#uiLocations').append(opt);
            });

            console.log("Locations successfully loaded.");
        } else {
            console.error("Invalid response from server:", data);
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error fetching locations:", textStatus, errorThrown);
    });
}




function onClickedEstimatePrice() {
    var sqft = document.getElementById("uiSqft").value;
    var bhk = getBHKValue();
    var bathrooms = getBathroomsValue();
    var location = document.getElementById("uiLocations").value;

    var url = "http://127.0.0.1:5000/predict_home_price";

    $.post(url, {
        total_sqft: parseFloat(sqft),
        bhk: bhk,
        bath: bathrooms,
        location: location
    },function(data, status) {
        if (data) {
            document.getElementById("uiEstimatedPrice").innerHTML = "<h2>" + data.estimated_price.toString() + " Lakhs</h2>";
        }
    });
}

function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
        if(uiBHK[i].checked) {
            return parseInt(uiBHK[i].value);
        }
    }
    return -1; // Invalid Value
}

function getBathroomsValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms) {
        if(uiBathrooms[i].checked) {
            return parseInt(uiBathrooms[i].value);
        }
    }
    return -1; // Invalid Value
}

// Fetch locations when the page loads
window.onload = 
    getLocations;

