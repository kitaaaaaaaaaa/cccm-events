var searchBy = "swimmer"

var yearDropdown = document.getElementById("swimmingYear")
var swimmingYear = yearDropdown.value
var dataFile = './data/swimmingData2025.json'

var swimmingMessage = document.getElementById('swimmingMessage')
var swimmingMessage2025 = document.getElementById('swimmingMessage').innerHTML
var swimmingMessage2024 = `
    The 2024 College Swimming Carnival, 
    held February 20th at Botany Aquatic Centre, 
    saw fierce competition in the championship events starting at 8am. 
    Following the championships, 
    a rotation of activities allowed all students to earn house points. 
    This year's victor was <strong> CHISHOLM </strong>, 
    showcasing impressive teamwork and athleticism. 
    Congratulations to all participants!
`

var dataTitle = document.getElementById("dataTitle")
var dataTitle2025 = "Find results from 2025’s Championship Events"
var dataTitle2024 = "Find results from 2024’s Championship Events"

var swimmingLink = document.getElementById("swimmingLink")
var swimmingLink2025 = "https://www.instagram.com/p/DGPXm2eyTkG/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
var swimmingLink2024 = "https://www.instagram.com/p/C36Km10In_q/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="

function fetchJSONData() {
    fetch(dataFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();  
        })
        .then(data => {
            // On keyup for search bar, refresh table
            $('#searchInput').on('keyup', function(){
                var value = $(this).val()

                var searchData = searchTable(value, data)

                buildTable(searchData)
            })

            // On selector button click, refresh table and search placeholder
            $('button').click(function(){
                var value = $('#searchInput').val()
                console.log(searchBy)

                var searchData = searchTable(value, data)

                buildTable(searchData)

                $('#searchInput').attr('placeholder', "Search by " + searchBy)
            })
            
            
            // Builds table by default
            buildTable(data)
        })
        .catch(error => console.error('Failed to fetch data:', error)); 
}

fetchJSONData()

function searchTable(value, data) {
    var filteredData = []

    for (var i = 0; i < data.length; i++) {
        value = value.toLowerCase()
        
        var searchCat = ""
        
        var name = data[i].firstname.toLowerCase() + " " + data[i].surname.toLowerCase()
        var age = data[i].age
        var house = data[i].house.toLowerCase()
        var event = data[i].event.toLowerCase() + " " + data[i].distance + "m " + data[i].event.toLowerCase()

        switch (searchBy) {
            case "swimmer":
                searchCat = name
                break
                case "age":
                    searchCat = age
                break
                case "house":
                    searchCat = house
                    break
            case "event":
                searchCat = event
                break
                default:
                searchCat = name
            }

        if (searchCat.includes(value)) {
            filteredData.push(data[i])
        }
    }

    return filteredData
}

function buildTable(data) {
    var table = document.getElementById('swimmingDataTable')
    
    table.innerHTML = ''

    for (var i = 0; i < data.length; i++) {
        var row = `<tr>
            <td>${data[i].firstname} ${data[i].surname}</td>
            <td>${data[i].age}</td>
            <td>${data[i].house}</td>
            <td>${data[i].event} • ${data[i].distance}m</td>
            <td>${data[i].time}</td>
            </tr>`
            
            table.innerHTML += row
            
        }
        
}
    
    
    
function searchSwimmer() {    
    var swimmerButton = document.getElementById("bySwimmer")
    var ageButton = document.getElementById("byAge")
    var houseButton = document.getElementById("byHouse")
    var eventButton = document.getElementById("byEvent")

    if (searchBy != "swimmer") {
        searchBy = "swimmer"
        swimmerButton.classList.add("selected")
        ageButton.classList.remove("selected")
        houseButton.classList.remove("selected")
        eventButton.classList.remove("selected")
    }
}

function searchAge() {    
    var swimmerButton = document.getElementById("bySwimmer")
    var ageButton = document.getElementById("byAge")
    var houseButton = document.getElementById("byHouse")
    var eventButton = document.getElementById("byEvent")
    
    if (searchBy != "age") {
        searchBy = "age"
        ageButton.classList.add("selected")
        swimmerButton.classList.remove("selected")
        houseButton.classList.remove("selected")
        eventButton.classList.remove("selected")
    }
}

function searchHouse() {    
    var swimmerButton = document.getElementById("bySwimmer")
    var ageButton = document.getElementById("byAge")
    var houseButton = document.getElementById("byHouse")
    var eventButton = document.getElementById("byEvent")
    
    if (searchBy != "house") {
        searchBy = "house"
        houseButton.classList.add("selected")
        swimmerButton.classList.remove("selected")
        ageButton.classList.remove("selected")
        eventButton.classList.remove("selected")
    }
}

function searchEvent() {    
    var swimmerButton = document.getElementById("bySwimmer")
    var ageButton = document.getElementById("byAge")
    var houseButton = document.getElementById("byHouse")
    var eventButton = document.getElementById("byEvent")
    
    if (searchBy != "event") {
        searchBy = "event"
        eventButton.classList.add("selected")
        swimmerButton.classList.remove("selected")
        ageButton.classList.remove("selected")
        houseButton.classList.remove("selected")
    }
}

function hidePopup() {
    element = document.getElementById("popup_wrapper")

    element.classList.add("hide")
    setTimeout(() => { element.style.display = "none"; }, 500);
}













function changeData() {
    swimmingYear = yearDropdown.value

    switch (swimmingYear) {
        case "2025":
            swimmingChart.data.datasets[0].data = yValues2025
            dataFile = './data/swimmingData2025.json'
            swimmingMessage.innerHTML = swimmingMessage2025
            swimmingLink.href = swimmingLink2025
            dataTitle.innerHTML = dataTitle2025

            pointsFile = './data/housePoints2025.json'

            break
        case "2024":
            swimmingChart.data.datasets[0].data = yValues2024
            dataFile = './data/swimmingData2024.json'
            swimmingMessage.innerHTML = swimmingMessage2024
            swimmingLink.href = swimmingLink2024
            dataTitle.innerHTML = dataTitle2024

            pointsFile = './data/housePoints2024.json'

            break
    }

    swimmingChart.update()
    fetchJSONData()
    fetchPointsJSONData()
}

var switchBarColorToggle = 0

function switchBarColor() {
    if (switchBarColorToggle == 0) {
        switchBarColorToggle = 1
        swimmingChart.data.datasets[0].borderWidth = 0;
        swimmingChart.data.datasets[0].backgroundColor = hiVisColors;
    } else {
        switchBarColorToggle = 0
        swimmingChart.data.datasets[0].borderWidth = 2;
        swimmingChart.data.datasets[0].backgroundColor = barColors;
    }

    swimmingChart.update()
}


const ctx = document.getElementById('myChart');

var xValues = ["Chavoin", "Chanel", "Chisholm", "Francis", "Mackillop", "Ozanam"];
var barColors = ["#ffadad", "#fdffb6","#ffd6a5","#caffbf","#a0c4ff","#bdb2ff"];
var borderColors = ["#ff8080", "#fcff70","#ffc580","#95ff80","#80b0ff","#9280ff"];
var hiVisColors = ["red", "yellow", "orange", "green", "blue", "purple"]

var yValues2025 = [627, 708, 369, 619, 482, 455];
var yValues2024 = [413, 460, 643, 389, 579, 358];

var barBorderWidth = 3

const swimmingChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            borderColor: borderColors,
            data: yValues2025,
            borderWidth: barBorderWidth,
        }]
    },
    options: {
        indexAxis: 'y',
        scales: {
            y: {
                grid: {
                    display: true,
                    drawBorder: false
                },
                ticks: {
                    font: {
                        family: "'Inter'",
                        size: 14,
                    },
                },
            },
            x: {
                beginAtZero: true,
                grid: {
                    drawBorder: true,
                    drawTicks: false
                }
            }
        },
        plugins: {
            title: {
                display: false,
            },
            legend: {
                display: false
            },
        }
    }
});

var pointsFile = './data/housePoints2025.json'

function fetchPointsJSONData() {
    fetch(pointsFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();  
        })
        .then(data => {
            // On keyup for search bar, refresh table
            $('#indivSearch').on('keyup', function(){
                var value = $(this).val()

                var searchData = searchPoints(value, data)

                refreshPoints(searchData[0])
            })

            buildPointsTable(data)
            buildPointsPodium(data)
        })
        .catch(error => console.error('Failed to fetch data:', error)); 
}

fetchPointsJSONData()


function refreshPoints(data) {
    var pointsName = document.getElementById("pointsName")
    var pointsScored = document.getElementById("pointsScored")
    var pointsPlace = document.getElementById("pointsPlace")

    pointsName.innerHTML = data.firstname + " " + data.surname
    pointsScored.innerHTML = "You scored: " + data.points + " points"
    pointsPlace.innerHTML = "You are " + data.place + "th"
}


function searchPoints(value, data) {
    var filteredData = []

    for (var i = 0; i < data.length; i++) {
        value = value.toLowerCase()
        
        var searchCat = data[i].firstname.toLowerCase() + " " + data[i].surname.toLowerCase()

        if (searchCat.includes(value)) {
            filteredData.push(data[i])
        }
    }

    return filteredData
}


function buildPointsPodium(data) {
    var pointsPodiumPoints1 = document.getElementById("pointsPodiumPoints1")
    var pointsPodiumPoints2 = document.getElementById("pointsPodiumPoints2")
    var pointsPodiumPoints3 = document.getElementById("pointsPodiumPoints3")

    var pointsPodiumName1 = document.getElementById("pointsPodiumName1")
    var pointsPodiumName2 = document.getElementById("pointsPodiumName2")
    var pointsPodiumName3 = document.getElementById("pointsPodiumName3")

    pointsPodiumPoints1.innerHTML = data[0].points + " pts"
    pointsPodiumName1.innerHTML = data[0].firstname + " " + data[0].surname

    pointsPodiumPoints2.innerHTML = data[1].points + " pts"
    pointsPodiumName2.innerHTML = data[1].firstname + " " + data[1].surname

    pointsPodiumPoints3.innerHTML = data[2].points + " pts"
    pointsPodiumName3.innerHTML = data[2].firstname + " " + data[2].surname
}


function buildPointsTable(data) {
    var table = document.getElementById('pointsDataTable')
    
    table.innerHTML = ''

    for (var i = 3; i < 12; i++) {
        var row = `<tr class="pointsTableRow">
            <td class="pointsTableData" style="font-size: 1.2em;"><strong>${data[i].place}</strong></td>
            <td class="pointsTableData">${data[i].firstname} ${data[i].surname}</td>
            <td class="pointsTableData">${data[i].points} pts</td>
            </tr>`
            
            table.innerHTML += row
            
        }
        
}

