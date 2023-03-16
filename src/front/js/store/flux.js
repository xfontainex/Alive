const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      // each time you open a new environment,check to make sure this is the same URL
      // do not include "/" at the end!
      // front URL is port 3000
      current_front_url:
        "https://3000-lalafontaine-alive-4jooccygb90.ws-eu90.gitpod.io",
      // back URL is port 3001
      current_back_url:
        "https://3001-lalafontaine-alive-4jooccygb90.ws-eu90.gitpod.io",

      latitude: null, //to store user location
      longitude: null, //to store user location
      token: null,
      is_org: null,
      name: null,
      avatarID: null,
      avatarImages: [
        "https://static.vecteezy.com/system/resources/previews/006/940/182/original/simple-minimalist-cute-dog-cartoon-illustration-drawing-premium-vector.jpg",
        "https://rlv.zcache.co.nz/beagle_puppy_dog_cartoon_love_beagles_stickers-r3e13c31e5cf44f388ad8e771530ada13_0ugmc_8byvr_736.jpg",
        // "https://cdn.shopify.com/s/files/1/0300/9124/7748/products/mockup-6fab90ef_1200x1200.jpg?v=1581906930",
        // "https://img.freepik.com/premium-vector/cute-beagle-puppies-cartoon-icon-illustration_665569-21.jpg",
        // "https://img.freepik.com/free-vector/cute-corgi-dog-eating-bone-cartoon_138676-2534.jpg?w=360",
        // "https://img.freepik.com/premium-vector/cute-corgi-dog-jumping-flat-cartoon-style_138676-2622.jpg",
        "https://scontent.xx.fbcdn.net/v/t39.30808-6/335450331_958974675262672_760475786018352766_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=730e14&_nc_ohc=WAiESXhQWgsAX_cW7kW&_nc_ht=scontent.xx&oh=00_AfA_t3FPLSMkbYH6QUElr_G4sNfBMGuZNcWBQqzdj3oSFg&oe=6418C092",
        "https://scontent.xx.fbcdn.net/v/t39.30808-6/335232755_925036255510713_8943605416508150051_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_ohc=XIpTHsPhP5IAX85iX3G&_nc_ht=scontent.xx&oh=00_AfDSpMoV-oD6WdOXxt63NsGw_MoEUSuuJJaVxM55DLqNtQ&oe=64189CE3",
        "https://scontent.xx.fbcdn.net/v/t39.30808-6/335487845_738771321086036_1848220266817976909_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=730e14&_nc_ohc=Lcixd55ObKcAX98lbCT&_nc_ht=scontent.xx&oh=00_AfAjuT0uG8ExLclqMxMGPjG5-KR1hi1Z7Y25jElh93Ak3A&oe=6418DA00",
        "https://scontent.xx.fbcdn.net/v/t39.30808-6/335432621_1616814228743296_4152607689584507039_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_ohc=rjaBuPROyhAAX8tJxfh&_nc_ht=scontent.xx&oh=00_AfC3cyAxVACvK6KFoI_57UZ1Iq5osbQtDXzL_muFUnUV9g&oe=64179036",
      ],
      favorites: [],
      searchResults: [],
      filteredResults: [],
      checked: false,
    },
    actions: {
      login: async (email, password) => {
        const current_back_url = getStore().current_back_url;
        const opts = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const response = await fetch(current_back_url + "/api/login", opts);
          if (response.status !== 200) {
            alert("There has been an error");
            return false;
          }
          const data = await response.json();
          console.log("data =", data);
          sessionStorage.setItem("token", data.access_token);
          sessionStorage.setItem("is_org", data.is_org);
          sessionStorage.setItem("name", data.name);
          let favoriteNames = [];
          data.favorites.forEach((favorite) => {
            favoriteNames.push(favorite.name);
          });
          setStore({
            token: data.access_token,
            is_org: data.is_org,
            avatarID: data.avatar,
            name: data.name,
            favorites: favoriteNames,
          });
          console.log("AVATAR ID", getStore().avatarID);
          return true;
        } catch (error) {
          console.error(error);
        }
      },
      createUser: async (is_org, name, email, password, userAvatar) => {
        const current_back_url = getStore().current_back_url;
        const opts = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            is_org: is_org,
            name: name,
            email: email,
            password: password,
            userAvatar: userAvatar,
          }),
        };
        try {
          const response = await fetch(
            current_back_url + "/api/createUser",
            opts
          );
          if (response.status >= 400) {
            alert("There has been an error");
            return false;
          }
          const data = await response.json();
          if (data.status == "true") {
          }
          return true;
        } catch (error) {
          console.error(error);
        }
      },
      logout: () => {
        const current_front_url = getStore().current_front_url;
        const token = sessionStorage.removeItem("token");
        const is_org = sessionStorage.removeItem("is_org");
        const name = sessionStorage.removeItem("name");
        setStore({ token: null, is_org: null, name: null });
        window.location.href = current_front_url + "/";
      },
      createResource: async (
        name,
        schedule,
        website,
        phone,
        address,
        resourceType,
        picture,
        description
        //, user_id
      ) => {
        const current_back_url = getStore().current_back_url;
        const current_front_url = getStore().current_front_url;
        const token = getStore().token;
        const opts = {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            name: name,
            schedule: schedule,
            website: website,
            phone: phone,
            address: address,
            category: resourceType,
            picture: picture,
            description: description,
            // user_id: user_id,
          }),
        };
        try {
          const response = await fetch(
            current_back_url + "/api/createResource",
            opts
          );
          if (response.status >= 400) {
            alert("There has been an error");
            return false;
          }
          const data = await response.json();
          if (data.status == "true") {
            window.location.href = current_front_url + "/";
          }
          return true;
        } catch (error) {
          console.error(error);
        }
      },
      updateLocation: (latitude, longitude) => {
        setStore({ latitude: latitude, longitude: longitude });
      },

      addFavorite: (resourceName) => {
        const current_back_url = getStore().current_back_url;
        const favorites = getStore().favorites;
        const token = getStore().token;
        console.log(resourceName);
        if (sessionStorage.getItem("token")) {
          const opts = {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              name: resourceName,
            }),
          };
          fetch(current_back_url + "/api/addFavorite", opts)
            .then((response) => response.json())
            .then((data) => {
              if (data.message == "okay") {
                favorites.push(resourceName);
                setStore({ favorites: favorites });
              }
            });
        }
      },
      removeFavorite: (resourceName) => {
        const current_back_url = getStore().current_back_url;
        const favorites = getStore().favorites;
        const token = getStore().token;
        if (sessionStorage.getItem("token")) {
          const opts = {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
            method: "DELETE",
            body: JSON.stringify({
              name: resourceName,
            }),
          };
          fetch(current_back_url + "/api/removeFavorite", opts)
            .then((response) => response.json())
            .then((data) => {
              if (data.message == "okay") {
                favorites.forEach((element, index) => {
                  if (element == resourceName) {
                    favorites.splice(index, 1);
                  }
                });
                setStore({ favorites: favorites });
              }
            })
            .catch((error) => console.log(error));
        }
      },

      setSearchResults: () => {
        const searchResults = getStore().searchResults;
        fetch(getStore().current_back_url + "/api/getResources")
          .then((response) => response.json())
          .then((data) => setStore({ searchResults: data.data }))
          .catch((error) => console.log(error));
      },

      filterSearchResults: (when, categorySearch) => {
        const searchResults = getStore().searchResults;
        const filteredResults = getStore().filteredResults;
        searchResults.forEach((item, index) => {
          // console.log(item.schedule);
          console.log("type of ", typeof item.schedule);
          if (
            item.category == categorySearch[0] ||
            item.category.includes(categorySearch[1]) ||
            item.category.includes(categorySearch[2]) ||
            item.category.includes(categorySearch[3]) ||
            item.schedule.some((scheduleItem) =>
              when.includes(scheduleItem.day.toLowerCase())
            )
          ) {
            filteredResults.push(item);
            setStore({ filteredResults: filteredResults });
          }
        });
      },
      resetSearchResults: () => {
        const filteredResults = getStore().filteredResults;
        let newArray = [];
        setStore({ filteredResults: newArray, checked: false });
      },
      setChecked: (checked) => {
        const storeChecked = getStore().checked;
        let newChecked = checked;
        setStore({ checked: newChecked });
      },
    },
  };
};

export default getState;
