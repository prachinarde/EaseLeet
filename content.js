var canShow = true;
var idss = 0;
var prevurl = ''
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check if the message is to remove the tags
    if (message.message === "hide") {
        chrome.runtime.sendMessage({ action: "refreshTab", changeCanShow: false });
    }
    else if (message.message === "show") {
        chrome.runtime.sendMessage({ action: "refreshTab", changeCanShow: true });
    }
    if (message.message === "yes-main") {
        chrome.storage.sync.get('canShow', function (data) {
            canShow = data.canShow;
            idss = message.info;
            if (prevurl !== idss) removeDifficultyTagsOuter(message.info);
            prevurl = idss
        });
    }

});


async function removeDifficultyTagsOuter(link) {
    // Array of class names representing difficulty tags
    if (canShow !== undefined && canShow === false) {
        var res = await fetch(`https://leetcode-company-api.onrender.com/?link=${link}`)
        var data = await res.json()
        var res2 = await fetch('https://leetcode-company-api.onrender.com/count')
        var data2 = await res2.json()
        const difficultyClasses = ["text-yellow", "text-olive", "text-pink", "text-difficulty-easy", "text-difficulty-medium", "text-difficulty-hard"]
        // Loop through each difficulty class
        //
        setTimeout(() => (difficultyClasses.forEach(className => {
            // Select elements with the current difficulty class
            const elements = document.querySelectorAll("." + className);
            // Remove each selected element
            elements.forEach(element => {
                element.innerHTML = 'Hidden';
                element.style.color = 'black';
            });
        })), 500)

        //
        setTimeout(() => {
            var acceptance = document.querySelectorAll(".flex.items-center.mx-2")
            for (var i = 3; i < acceptance.length; i += 6) {
                acceptance[i].innerHTML = "-";
            }
            for (var i = 5; i < acceptance.length; i += 6) {

                if (data2[acceptance[i - 4].innerText.substring(acceptance[i - 4].innerText.indexOf('.') + 2)]) {
                    const a = document.createElement('div');
                    a.innerText = data2[acceptance[i - 4].innerText.substring(acceptance[i - 4].innerText.indexOf('.') + 2)]
                    a.style.width = data2[acceptance[i - 4].innerText.substring(acceptance[i - 4].innerText.indexOf('.') + 2)] * 2.5 + 'px'
                    if (a.innerText > 60) a.style.backgroundColor = 'red'
                    else if (a.innerText > 30 && a.innerText <= 60) a.style.backgroundColor = 'orange'
                    else a.style.backgroundColor = 'green'
                    a.style.height = 10 + 'px'
                    a.style.borderRadius = 10 + 'px'
                    a.style.color = 'white'
                    a.style.fontSize = 12 + 'px'
                    a.style.display = 'flex'
                    a.style.justifyContent = 'center'
                    a.style.alignItems = 'center'
                    acceptance[i].innerHTML = ''
                    acceptance[i].appendChild(a)

                }

                else acceptance[i].innerText = 'Not Found'
            }
        }, 500)

        //
        setTimeout(() => {
            document.querySelector(".flex.flex-wrap.items-center").innerHTML = "Acceptance , Submission , Acceptance Rate : HIDDEN"
        }, 500)

        //
        setTimeout(() => {
            var parentElement = document.querySelectorAll(".flex.gap-1")[8]
            var parentElement2 = document.querySelectorAll(".flex.gap-1")[9]
            if (document.querySelectorAll(".flex.gap-1")[8].innerText != 'Solved') parentElement.removeChild(parentElement.children[2])
            else parentElement2.removeChild(parentElement2.children[2])
            if (data.length) {
                var companiess = document.createElement('div')
                companiess.className = "flex gap-1"
                companiess.id = 'companiess'
                data.forEach(element => {
                    var a = document.createElement('div')
                    a.innerText = element
                    a.className = 'relative inline-flex items-center justify-center text-caption px-2 py-1 gap-1 rounded-full bg-fill-secondary cursor-pointer transition-colors hover:bg-fill-primary hover:text-text-primary text-sd-secondary-foreground hover:opacity-80'
                    companiess.appendChild(a)

                })
                var existingCompaniesDiv = document.getElementById('companiess');
                if (existingCompaniesDiv) {
                    existingCompaniesDiv.remove();
                }

                if (document.querySelectorAll(".flex.gap-1")[8].innerText === 'Solved') document.querySelectorAll(".flex.gap-1")[9].appendChild(companiess)
                else document.querySelectorAll(".flex.gap-1")[8].appendChild(companiess)
                var existingCompaniesDiv = document.getElementById('companiess');

            }
        }, 500)

        // YouTube Embed
        let url = `${link}`;
        let startIndex = url.indexOf("/problems/");
        let endIndex = url.indexOf("/", startIndex + "/problems/".length);
        let extractedText = url.substring(startIndex + "/problems/".length, endIndex);
        let newString = extractedText.replace(/-/g, '%2B');
        newString += "%2Bleetcode"

        var videoData, embeds;

        fetch(`https://youtube-video-fetching.onrender.com?text=${newString}`)
            .then(res => res.json())
            .then(data => {
                videoData = data.items;
                embeds = videoData.map(video => {
                    var videoId = video.id
                    return (
                        `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
                    )
                })
                console.log(embeds)

            }).then(() => {
                const vidBar = document.querySelectorAll(".mt-6.flex.flex-col.gap-3")[0];

                const videoBar = document.getElementById("videoBar")

                if (videoBar) {
                    videoBar.remove()
                }

                // Create the dropdown element
                function createDropdown() {
                    // Create the dropdown container
                    const dropdownContainer = document.createElement('div');
                    dropdownContainer.classList.add('relative');
                    dropdownContainer.id = "videoBar"

                    // Create the dropdown header
                    const dropdownHeader = document.createElement('div');
                    dropdownHeader.classList.add('group', 'flex', 'cursor-pointer', 'items-center', 'transition-colors', 'text-label-2', 'dark:text-dark-label-2', 'hover:text-label-1', 'dark:hover:text-dark-label-1');
                    dropdownHeader.innerHTML = `
    <div class="flex-1 text-sm leading-[22px]">
        <div class="text-sd-foreground flex items-center gap-2">
            <div class="relative text-[16px] leading-[normal] p-0.5 before:block before:h-4 before:w-4 text-sd-foreground fill-none stroke-current">
                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="tag" class="svg-inline--fa fa-tag absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M197.5 32c17 0 33.3 6.7 45.3 18.7l176 176c25 25 25 65.5 0 90.5L285.3 450.7c-25 25-65.5 25-90.5 0l-176-176C6.7 262.7 0 246.5 0 229.5V80C0 53.5 21.5 32 48 32H197.5zM48 229.5c0 4.2 1.7 8.3 4.7 11.3l176 176c6.2 6.2 16.4 6.2 22.6 0L384.8 283.3c6.2-6.2 6.2-16.4 0-22.6l-176-176c-3-3-7.1-4.7-11.3-4.7H48V229.5zM112 112a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path></svg>
            </div>
            <div class="text-body text-text-primary dark:text-text-primary">Videos</div>
        </div>
    </div>
    <div class="text-[24px] transition-colors text-gray-4 dark:text-dark-gray-4 group-hover:text-gray-5 dark:group-hover:text-dark-gray-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" class="origin-center transition-transform"><path fill-rule="evenodd" d="M16.293 9.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L12 13.586l4.293-4.293z" clip-rule="evenodd"></path></svg>
    </div>
`;

                    // Create the dropdown content
                    const dropdownContent = document.createElement('div');
                    dropdownContent.classList.add('absolute', 'w-full', 'bg-white', 'rounded', 'shadow-md', 'py-2', 'transition-all', 'duration-300', 'z-10');

                    // Create the content for the dropdown
                    const dropdownContentInner = document.createElement('div');
                    dropdownContentInner.classList.add('flex', 'flex-wrap', 'gap-1', 'pl-7', 'video-content'); // Add a new class for the video content

                    // Create video elements and append them to the dropdown content
                    embeds.forEach(vid => {
                        const video = document.createElement('div');
                        video.innerHTML = vid
                        dropdownContentInner.appendChild(video);
                    })

                    // Append dropdown header and content to the container
                    dropdownContainer.appendChild(dropdownHeader);
                    dropdownContainer.appendChild(dropdownContent);
                    dropdownContent.appendChild(dropdownContentInner);

                    // Event listener to toggle content visibility on header click
                    dropdownHeader.addEventListener('click', () => {
                        dropdownContent.classList.toggle('hidden');
                    });

                    return dropdownContainer;
                }

                // Create the dropdown element
                const dropdownElement = createDropdown();

                // Append the dropdown element to the document body or any desired parent element
                vidBar.appendChild(dropdownElement);
            })
        prevurl = link

    }
}
