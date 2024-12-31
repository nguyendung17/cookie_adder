document.getElementById('addCookieBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        const url = new URL(currentTab.url);
        const domain = url.hostname;
        const cookieString = document.getElementById('cookieString').value;

        // Kiểm tra xem cookieString đã được nhập chưa
        if (!cookieString) {
            alert('Please enter a valid cookie string.');
            return;
        }

        const cookies = cookieString.split(';').map(c => c.trim());

        cookies.forEach(cookie => {
            const [name, value] = cookie.split('=');
            console.log(name, value);

            if (name && value) {
                const cookieDetails = {
                    url: `https://${domain}`, // Chuyển đổi domain sang URL
                    name: name.trim(),
                    value: value.trim(),
                    // Có thể thêm các thuộc tính khác nếu cần
                };

                chrome.cookies.set(cookieDetails, (cookie) => {
                    if (chrome.runtime.lastError) {
                        console.error(`Failed to add cookie ${name}: ${chrome.runtime.lastError.message}`);
                    } else {
                        console.log(`Cookie ${name} added successfully!`);
                    }
                });
            }
        });
        setTimeout(() => {
            chrome.tabs.reload(currentTab.id);
        }, 2000);


        // alert('Cookies added successfully!');
    });
});