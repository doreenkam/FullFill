import { Card, Avatar, Typography, IconButton, Snackbar, Alert, Checkbox, CardActions, Chip, Grid, Button, Input, FormControl, FormLabel, TextField } from "@mui/material";
import { Favorite, FavoriteBorder, Share, SentimentSatisfiedAltOutlined, SentimentSatisfiedAlt, CommentOutlined, Comment } from "@mui/icons-material";
import dayjs from "dayjs"

import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";

const Community = () => {
    const {id} = useParams();
    const randomColours = ['#FFCC60', '#FFAB5F', '#A5BC79', '#F0CCCC', '#78B591', '#EF645E', '#F9EBCF']
    const getRandomColour = () => {
        return randomColours[Math.floor(Math.random() * randomColours.length)]
    }
    const [communityTitle, setCommunityTitle] = useState(null);
    const [communityDescription, setCommunityDescription] = useState('');
    const [posts, setPosts] = useState('');

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isMember, setIsMember] = useState(false);

    const [comment, setComment] = useState([])
    const [newComment, setNewComment] = useState('')
//snackbar
const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;
  const navigate = useNavigate();
const [alertMessage, setAlertMessage] = useState('');

    // checks if user is member of community
    useEffect(()=>{
        async function fetchData() {
            const response = await axiosInstance.get(`http://localhost:8000/api/communities/${id}/memberships/`);
            if(response.data.length > 0){
                setIsMember(true);
            }
        }
        fetchData();
    })

    // fetches description of community
    useEffect(() => {
        async function fetchData() {
            const response = await axiosInstance.get('http://localhost:8000/api/communities/' + id);
            setCommunityTitle(response.data.title)
            setCommunityDescription(response.data.description)
        }
        fetchData();
    }, [id])

    // fetches posts of community
    useEffect(() => {
        async function fetchData() {
            const response = await axiosInstance.get('http://localhost:8000/api/communities/' + id + '/posts/');
            setPosts(response.data)
            console.log(response.data, 'posts')

        }
    fetchData();
}, [id])

// handle post submit
const handleSubmit = async (e, reason) => {
    e.preventDefault();

    const response = await axiosInstance.post('http://localhost:8000/api/communities/posts/', {
        title: title,
        description: description,
        community: id
    });
    setTitle('');
    setDescription('');
    setPosts([...posts, response.data])
    setAlertMessage('Your new post has been created!')
    setState({ open: true, vertical: 'top',
    horizontal: 'center', });
}
// user joins community
const handleJoin = async(e)=>{
    e.preventDefault();
    const response = await axiosInstance.post('http://localhost:8000/api/communities/'+id+'/memberships/', {});
    setAlertMessage(response.data.message)
    setState({ open: true, vertical: 'top',
    horizontal: 'center', });
}

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setState({  vertical: 'top',
    horizontal: 'center', open: false });
  };

  const handleClick = (username) => {
    navigate(`/profile/${username}`);
  }

  const handleComment = async(e, postId) => {
<<<<<<< HEAD
    // const response = await axiosInstance.post('http://localhost:8000/api/posts/'+postId+'/comments/', {
    //     description: 'test'
    // });
    // setPosts(posts.map(post => {
    //     if(post.id === postId){
    //         post.comments = [...post.comments, response.data]
    //     }
    //     return post
    // }))
    e.preventDefault();
    console.log(postId)
}

  const showComment= async(e, postId) => {
    e.preventDefault();
    const response = await axiosInstance.get('http://localhost:8000/api/communities/posts/'+postId+'/comments/');
    console.log(response.data)
=======
    e.preventDefault();
    const response = await axiosInstance.post('https://fullfill-server.herokuapp.com/api/communities/posts/'+postId+'/comments/', {
        comment: newComment
    });
    showComment(e, postId)
    // for alert:
    setAlertMessage('Your comment has been added!')
    setState({ open: true, vertical: 'top',
    horizontal: 'center', });
}
// get comments
  const showComment= async(e, postId) => {
    e.preventDefault();
    const response = await axiosInstance.get('https://fullfill-server.herokuapp.com/api/communities/posts/'+postId+'/comments/');
>>>>>>> 8e9826362074fbbcceca0924f85505ac7bf3eb9c
    setComment(response.data)
  }

  const handleLike = async (postId) => {
<<<<<<< HEAD
    const response = await axiosInstance.post('http://localhost:8000/api/communities/posts/' + postId + '/likes/', {});
=======
    const response = await axiosInstance.post('https://fullfill-server.herokuapp.com/api/communities/posts/' + postId + '/likes/', {});
>>>>>>> 8e9826362074fbbcceca0924f85505ac7bf3eb9c
    setPosts(posts.map(post => {
        if (post.id === postId) {
            return {
                ...post,
                likes: post.likes + 1
            }
        }
        return post;
    }
    ))
}


    return (
      <div className="container d-flex text-center flex-column">
        {isMember ? (
          <Typography variant="h6">Welcome member!</Typography>
        ) : (
          <Button onClick={handleJoin}>Join Community</Button>
        )}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
      vertical: "top",
      horizontal: "center"
   }}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
        <br/>
        {/* if member is true, user can post */}
        

        {communityTitle && communityTitle ? (
          <div >
            <h1>{communityTitle}</h1>
            <h2>{communityDescription}</h2>
            {isMember && (
          <div className="container" style={{maxWidth:'500px', alignSelf:'center', justifyContent:'center'}}>
          <form onSubmit={handleSubmit}>
          <FormControl>
<<<<<<< HEAD
          <FormLabel>Create a post</FormLabel>
            <Input
=======
          <FormLabel sx={{fontSize:'1.2rem'}}>Create a post</FormLabel>
            <TextField
            variant="outlined"
>>>>>>> 8e9826362074fbbcceca0924f85505ac7bf3eb9c
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
            <TextField
            variant="outlined"
              type="text"
              name="description"
              placeholder="Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            />
            <Button type="submit" variant="contained">Post</Button>
          </FormControl>
          </form>
          </div>
        )}
<<<<<<< HEAD

        {communityTitle && communityTitle ? (
          <div >
            <h1>{communityTitle}</h1>
            <h2>{communityDescription}</h2>

            <h3 className="my-2">Posts</h3>
  
=======
            <Typography variant="h4" className="text-center">All Posts</Typography>
            <div className="d-flex flex-column justify-content-center align-items-center">
>>>>>>> 8e9826362074fbbcceca0924f85505ac7bf3eb9c
            {posts.length > 0
              ? posts.slice(0).reverse().map((p, i) => {
                  return (
                    <Card
                      key={i}
                      id={p.id}
                      sx={{
                        m: "15px",
                        p: "15px",
                        minWidth:'325px',
                        maxWidth:'500px'
                      }}
                    >
                      <IconButton onClick={e=> handleClick(p.creator.user_name)}>
                        <Avatar
                          alt={p.creator.user_name}
                          src="/static/images/avatar/2.jpg"
                          sx={{ backgroundColor: 'pink'}}
                        />
                        <Typography variant="h6" noWrap sx={{ ml: 2, textAlign:'left' }} >
                          {p.creator.user_name}
                        </Typography>
                       
                      </IconButton>
                      <Chip label={"Posted "+dayjs(p.created_at).format('DD/MM/YYYY')} sx={{ alignItem:"right", mr:0}}/>
                      <h4 style={{textAlign:"left"}}>{p.title}</h4>
                      <p style={{textAlign:"left"}}>{p.description}</p>
                      <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color:"red"}} />} />
          </IconButton>
          <IconButton aria-label="share">
            <Checkbox icon ={<SentimentSatisfiedAltOutlined />} checkedIcon={<SentimentSatisfiedAlt sx={{color:"blue"}} />} />
          </IconButton>
          <IconButton aria-label="add-comment">
            <Checkbox icon ={<CommentOutlined />} checkedIcon={<Comment sx={{color:"green"}} />} onClick={(e) => showComment(e, p.id)}/>
          </IconButton>
          <form onSubmit={(e) => handleComment(e, p.id)}>
            <FormControl>
                <TextField sx={{mt:5}} type="text" variant="outlined" placeholder="Add a comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <Button type="submit">Add comment</Button>
            </FormControl>
            </form>          
        </CardActions>
          <div style={{display: 'block'}}>
<<<<<<< HEAD
          {comment.length > 0 && comment.map((c, i) => {
=======
          {comment.length > 0 && comment.slice(0).reverse().map((c, i) => {
            if(c.post === p.id){
>>>>>>> 8e9826362074fbbcceca0924f85505ac7bf3eb9c
            return (
              <div key={i}>
                <Card
                  key={i}
                  id={c.id}
                  sx={{
                    m: "15px",
                    p: "15px",
<<<<<<< HEAD
                    minWidth:'325px',
                    maxWidth:'500px'
                  }}
                >
                  <IconButton onClick={e=> handleClick(c.creator.user_name)}>
                    <Avatar
                      src="/static/images/avatar/2.jpg"
                      sx={{ backgroundColor: getRandomColour() }}
=======
                  }}
                >
                  <IconButton style={{textAlign:'left'}} onClick={e=> handleClick(c.username)}>
                    <Avatar
                      alt={c.username}
                      src="/static/images/avatar/2.jpg"
                      sx={{ backgroundColor: 'green' }}
>>>>>>> 8e9826362074fbbcceca0924f85505ac7bf3eb9c
                    />
                    <Typography variant="h6" noWrap sx={{ ml: 2, textAlign:'left' }} >
                      {c.username}
                    </Typography>
                   
                  </IconButton>
                  <Chip label={"Commented "+dayjs(c.created_at).format('DD/MM/YYYY')} sx={{ alignItem:"right", mr:0}}/>
<<<<<<< HEAD
                  <Typography variant="h6" style={{textAlign:"left"}}>{c.body}</Typography>
=======
                  <p style={{textAlign:"left"}}>{c.body}</p>
>>>>>>> 8e9826362074fbbcceca0924f85505ac7bf3eb9c
                </Card>
              </div>
            )
          }
<<<<<<< HEAD
=======
          }
>>>>>>> 8e9826362074fbbcceca0924f85505ac7bf3eb9c
          )}

          </div>
          </Card>
                    
                  );
                  
                })
                
              : "No posts"}
              
<<<<<<< HEAD
=======
          </div>
>>>>>>> 8e9826362074fbbcceca0924f85505ac7bf3eb9c
          </div>
        ) : (
          "nothing to see here"
        )}
       
      </div>
    );
}
 
export default Community;
