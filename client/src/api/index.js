import axios from "axios";

// GET REQUESTS

export const getAllCourses = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.get(`http://localhost:8080/courses`);
        if (response.status === 200) {
          resolve({ status: response.status, data: response.data });
        } else {
          reject(new Error(`HTTP error: ${response.status}`));
        }
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
};


export const getSearchedCourses = async (query) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.get(`http://localhost:8080/courses/?q=${query}`);
        if (response.status === 200) {
          resolve({ status: response.status, data: response.data });
        } else {
          reject(new Error(`HTTP error: ${response.status}`));
        }
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
};

export const getCourseDetails = async (courseId) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/courses/${courseId}`
        );
        if (response.status === 200) {
          resolve({ status: response.status, data: response.data });
        } else {
          reject(new Error(`HTTP error: ${response.status}`));
        }
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
};

export const getAllUsers = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users`);
        if (response.status === 200) {
          resolve({ status: response.status, data: response.data });
        } else {
          reject(new Error(`HTTP error: ${response.status}`));
        }
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
};

// POST REQUESTS

export const registerUser = async (formdata) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.post(
          `http://localhost:8080/users`,
          formdata
        );
        console.log(response, "registerApi");
        if (response.status === 201) {
          resolve({ status: response.status, data: response.data });
        } else {
          reject(new Error(`HTTP error: ${response.status}`));
        }
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
};


// Patch Requests

export const enrollCourse = async (prevusers, user, ID) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.patch(
          `http://localhost:8080/courses/${ID}`,
          {
            students: [...prevusers, user],
          }
        );
        console.log(response);
        if (response.status === 200) {
          resolve({ status: response.status, data: response.data });
        } else {
          reject(new Error(`HTTP error: ${response.status}`));
        }
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
};
