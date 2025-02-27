
const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");

function hide(obj) {
    var home = document.getElementById('home');
    home.style.display = 'none';

    var contact = document.getElementById('contact');
    contact.style.display = 'none';

    var about = document.getElementById('about');
    about.style.display = 'none';

    var el = document.getElementById(obj);
    el.style.display = 'block';
}

function Clear(event) {
    const contentList = document.getElementById('contentList');
    contentList.innerHTML = '';
}

function ReadJSON(event) {
    event.preventDefault();
    const search = document.getElementById('search').value.toLowerCase();
    const locals = [];

    fetch('./travel_recommendation_api.json').then(response => {
        return response.json();
    }).then(data => {
        //console.log(data);
        //console.log(search);
        if (search != '')
        {
            data.countries.forEach(element => {
                //console.log(element);
                element.cities.forEach(citie => {
                    //console.log(citie.name);
                    if(citie.name.toLowerCase().includes(search) || citie.description.toLowerCase().includes(search))
                    {
                        locals.push(citie);
                    }
                })
            });
            data.temples.forEach(element => {
                if(element.name.toLowerCase().includes(search) || element.description.toLowerCase().includes(search))
                {
                    locals.push(citie);
                }
            });
            data.beaches.forEach(element => {
                if(element.name.toLowerCase().includes(search) || element.description.toLowerCase().includes(search))
                {
                    locals.push(citie);
                }
            });
            //console.log(locals);
            const contentList = document.getElementById('contentList');
            contentList.innerHTML = '';

            locals.forEach(element => {
                var div = document.createElement('div');
                div.innerHTML = `<img src="${element.imageUrl}" style="width:700px;height:400px;">
                    <div id='localDesc'>
                        <h1 style="padding-left: 20px;">${element.name}</h1>
                        <h3 style="padding-left: 20px;">${element.description}</h3>
                    </div>
                    </br>`;

                document.getElementById('contentList').appendChild(div);
            });
        }
        else
        Clear();

    }).catch(err => {
        console.log(err);
    });
};

btnSearch.addEventListener("click", ReadJSON);
btnClear.addEventListener("click", Clear);