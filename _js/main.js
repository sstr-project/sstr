let techniquesData = []; 


function filterTechniques() {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();

    const filteredData = techniquesData.filter(item => 
        (item.nano_technique?.toLowerCase().includes(searchQuery) ||
        item.tactics?.toLowerCase().includes(searchQuery) ||
        item.techniques?.toLowerCase().includes(searchQuery)) 
    );

    displayTechniques(filteredData);
}



function displayTechniques(data) {
    const techniquesTableBody = document.getElementById('techniques-body');
    techniquesTableBody.innerHTML = ''; 
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="details.html?id=${item.sstr_id}">${item.sstr_id}</a></td>
            <td><a href="details.html?id=${item.sstr_id}">${item.sstr_technique}</a></td>
           
                <td>${item.tactics}</td>
               
                <td>${item.technique}</td>
                <td>${item.sub_technique}</td>
				<td>${item.sstr_platform}</td>
				<td>${item.entry_date}</td>
              
             
        `;
        techniquesTableBody.appendChild(row);
    });
}


fetch('_data/sstr-techniques.json')
    .then(response => response.json())
    .then(data => {
        techniquesData = data["SSTR Techniques"]; 
        
        techniquesData.sort((a, b) => new Date(b.entry_date) - new Date(a.entry_date));
        displayTechniques(techniquesData); 
    })
    .catch(error => {
        console.error('Error loading techniques:', error);
    });
