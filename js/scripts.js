var url_or_id;
const fetchLoomDownloadUrl = async (id) => {
    const url = `https://www.loom.com/api/campaigns/sessions/${id}/transcoded-url`;
    const { data } = await axios.post(url);
    console.log("data", data)
    return data.url;
};

const downloadLoomVideo = async (url, filename) => {
    const response = await axios({
        method: 'get',
        url: url,
        responseType: 'blob'
    })

    console.log("reponse", response)
    var a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([response.data], { type: 'video/mp4' }));
    a.download = `loom-video-${new Date().toLocaleString()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    hideSpinner()

};

const extractId = (url) => {
    url = url.split('?')[0];
    return url.split('/').pop();
};

const downloadSingleFile = async () => {
    const id = extractId(url_or_id);
    const url = await fetchLoomDownloadUrl(id);
    const filename = `${id}.mp4`;
    console.log(`Downloading video ${id} and saving to ${filename}`);
    downloadLoomVideo(url, filename);
};

const showSPinner = () => {
    document.getElementById('spinner').classList.remove("d-none")
    document.getElementById('submitButton').classList.add("d-none")
}

const hideSpinner = () => {
    document.getElementById('spinner').classList.add("d-none")
    document.getElementById('submitButton').classList.remove("d-none")
}
const main = async () => {

    showSPinner();
    url_or_id = document.getElementById('url-or-id').value
    await downloadSingleFile();

    setTimeout(() => {
        hideSpinner();
      }, 5000);
    
};


document.getElementById('submitButton').addEventListener("click", function () {
    console.log("clicked")
    main()
});