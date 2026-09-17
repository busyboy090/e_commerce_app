export const getUserCountry = async () => {
    const cache = JSON.parse(localStorage.getItem("user_country_cache"));
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
  
    if (cache && now - cache.timestamp < oneDay) {
      return cache.country;
    }
  
    try {
      const res = await fetch("https://ipwho.is/");
      const data = await res.json();
  
      if (data.success) {
        const country = {
          name: data.country,
          code: data.country_code, // like 'NG'
          callingCode: data.country_calling_code,
        };
  
        localStorage.setItem(
          "user_country_cache",
          JSON.stringify({ country, timestamp: now })
        );
  
        return country;
      }
    } catch (err) {
      return null;
    }
};
  