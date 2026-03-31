const params = new URLSearchParams (window.location.search)
const artistid = params.get("artistid")
const artistName = params.get("artistname")
const nameArtistTitle = document.querySelector(".nameArtistTitle")
const test = "https://striveschool-api.herokuapp.com/api/deezer/artist/13/top?limit=50"
const spinner = document.querySelector(".loadingSpinner")
const listSong = document.querySelector(".listSongs")


const showSpinner = () => {
    spinner.classList.remove("d-none")
}


const hideSpinner = () => {
    spinner.classList.add("d-none")
}




const populateArtistName = (artistName) => {
    if (artistName){
        nameArtistTitle.textContent = artistName
    }
    
}

const getAlbumDetails = async (artistid) => {
    showSpinner()
    try{
        const response = await fetch (`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistid}/top?limit=50`)
        return await response.json()
    }catch(error){
        console.log(error)
    }finally{
        hideSpinner()
    }
}

const generateRow = (song) =>{
    const li = document.createElement("li")
    const titleSong = document.createElement("span")
    const durationSong = document.createElement("span")


    titleSong.textContent = song.title
    durationSong.textContent = song.duration
    li.append(titleSong, durationSong)

    li.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center")
    durationSong.setAttribute("class", "badge badge-primary badge-pill")

    listSong.appendChild(li)
}



populateArtistName(artistName)

getAlbumDetails(artistid).then(res => {
    res.data.forEach(element => {
        generateRow(element)
    });
})