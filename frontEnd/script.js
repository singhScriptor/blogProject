document.addEventListener('DOMContentLoaded', handleRefresh)
const form = document.getElementById('form')
const userlist = document.getElementById('userlist')

form.addEventListener('submit', addBlog);

async function addBlog(e) {
    e.preventDefault()
    try {
        const blogs = {
            title: document.getElementById('blog').value,
            author: document.getElementById('author').value,
            content: document.getElementById('content').value,
        }
        if (blogs) {
            const res = await axios.post('http://localhost:3000/blogs', blogs)
            console.log(res.data)
            const details = res.data
            await displayBlogs(details)

        }
        else {
            console.log('submit the details first...')
        }
    }
    catch (err) {
        console.log(err.message)
    }

}

async function displayBlogs(details) {
    const list = document.createElement("li");
    list.className = "list list-group-item bg-dark  p-3 text-white";

    const titleSpan = document.createElement("span");
    titleSpan.textContent = details.title;

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "+";
    toggleBtn.className = "btn btn-sm btn-danger d-flex ms-auto";

    list.appendChild(titleSpan);
    list.appendChild(toggleBtn);
    userlist.appendChild(list);

    toggleBtn.addEventListener("click", async () => {
        let existing = list.querySelector(".details");
        if (existing) {
            existing.remove();
            toggleBtn.textContent = "+";
            return;
        }

        const detailsDiv = document.createElement("div");
        detailsDiv.className = "details mt-2 p-2 rounded bg-dark text-white";

        detailsDiv.innerHTML = `
      <p><strong>Author:</strong> ${details.author}</p>
      <p><strong>Content:</strong> ${details.content}</p>
      <h6>Comments:</h6>

      <input type="text" class="comment-input form-control mb-2" placeholder="Add comment..." />
      <button class="btn btn-sm btn-success submit-comment">Submit Comment</button>
      <ul class="comments list-group mb-2"></ul>
    `;

        list.appendChild(detailsDiv);
        toggleBtn.textContent = "−";

        const commentInput = detailsDiv.querySelector(".comment-input");
        const commentList = detailsDiv.querySelector(".comments");
        const submitBtn = detailsDiv.querySelector(".submit-comment");

        // Load existing comments from DB
        try {
            const res = await axios.get(`http://localhost:3000/blogs/${details.id}/comments`);
            res.data.forEach(c => renderComment(c, commentList, details.id));

        } catch (err) {
            console.log("Error loading comments:", err.message);
        }

        // Add new comment
        submitBtn.addEventListener("click", async () => {
            const text = commentInput.value.trim();
            if (text) {
                try {
                    const res = await axios.post(`http://localhost:3000/blogs/${details.id}/comments`, { comment: text });

                    renderComment(res.data, commentList, details.id); // render saved comment
                    commentInput.value = "";
                } catch (err) {
                    console.log("Error posting comment:", err.message);
                }
            }
        });
    });
}

// helper to render comment with delete
function renderComment(comment, commentList, blogId) {
    const commentLi = document.createElement("li");
    commentLi.className = "list-group-item d-flex justify-content-between align-items-center bg-dark text-white mt-1";
    commentLi.textContent = comment.comment;

    const delBtn = document.createElement("button");
    delBtn.textContent = "x";
    delBtn.className = "btn btn-sm btn-danger ms-2";

    delBtn.addEventListener("click", async () => {
        try {
            await axios.delete(`http://localhost:3000/blogs/${blogId}/comments/${comment.id}`);

            commentLi.remove();
        } catch (err) {
            console.log("Error deleting comment:", err.message);
        }
    });

    commentLi.appendChild(delBtn);
    commentList.appendChild(commentLi);

}

async function handleRefresh() {
    try {
        // GET all blogs from backend
        const res = await axios.get("http://localhost:3000/blogs");
        const blogs = res.data;

        // clear old list
        userlist.innerHTML = "";

        // render each blog
        blogs.forEach(blog => {
            displayBlogs(blog);
        });
    } catch (err) {
        console.log("Error fetching blogs:", err.message);
    }
}
