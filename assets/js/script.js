const eminemSec = document.querySelector("#eminemSection")
const spinner = document.querySelector(".loadingSpinner")
const allertEr = document.querySelector(".errorAlert")
const valueSearch = document.querySelector(".searchInput")
const searchBtn = document.querySelector(".buttonSearch")

searchBtn.addEventListener("click", async () => {
    const albums = await defaultAlbumData(valueSearch.value)
    eminemSec.innerHTML = ""
    albums.data.forEach(album => {
        generateCard(album)
    })
})


const showSpinner = () => {
    spinner.classList.remove("d-none")
}


const hideSpinner = () => {
    spinner.classList.add("d-none")
}


const defaultAlbumData= async (artistName) => {
    showSpinner()
    try{
        const response = await fetch (`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistName}`)
        return await response.json()
    } catch(error) {
        console.log(error)
        allertEr.classList.remove("d-none")
    } finally {
        hideSpinner()
    }
}

const generateCard = (album) => {
    const anchorImgContainer = document.createElement("a")
    const albumContainer = document.createElement("div")
    const imgAlbum = document.createElement("img")
    const albumName = document.createElement("p")
    const artistName = document.createElement("p")

    anchorImgContainer.setAttribute("href", `./details.html?artistid=${album.artist.id}&artistname=${album.artist.name}`)
    imgAlbum.src = album.album.cover_medium
    albumName.textContent = album.album.title
    artistName.textContent = album.artist.name

    anchorImgContainer.appendChild(imgAlbum)
    albumContainer.append(anchorImgContainer, albumName, artistName)
    eminemSec.appendChild(albumContainer)
}

defaultAlbumData("eminem").then(res => {
    res.data.forEach(album => {
        generateCard(album)
    });
})