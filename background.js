chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "addCookie") {
    const cookieDetails = {
      url: request.url,
      name: request.name,
      value: request.value,
      domain: '.' + new URL(request.url).hostname,
      httpOnly: true,
      secure: true,
      expirationDate: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // Ngày hiện tại + 1 tuần
      // Thêm các thuộc tính cookie khác nếu cần
    };
  
      chrome.cookies.set(cookieDetails, (cookie) => {
        sendResponse({ success: !!cookie });
      });
      return true; // Để giữ kết nối mở cho sendResponse
    }
  });