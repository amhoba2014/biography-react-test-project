## What is this?

This is a test assessment project I've created using **React.js**.  
It consists of three pages: **Builder**, **Content** and **Biography**.

## Technologies and Technical Details:

I've used **React Router** as the routing mechanism for this application and the whole app is an SPA created using `create-react-app`. This was a mandatory thing although we could have used frameworks like **Next.js** and **Gatsby.js** which provide their own routing mechanisms (based on filesystem level routing) as well as many other great developer tools.

I've used **JSS** for the CSS styling of this project as it fits great into developer tools. At first I tried to use `styled-jsx` which is another product from Vercel (the company behind **Next.js**) but it didn't fit into the CRA SPA workflow.

For managing localstorage I've used the `localforge` library.

Dark mode is managed by a Redux store globally everywhere in the application.

For the RTE (Rich Text Editor), I've decided to use **TinyMCE**, not only it is quite old and mature, also it fits really well with React. I could have used other frameworks like **Draft.js** but I decided not to, cause it would have make things take longer time for no good reason.

Components are taken from the **Ant Design** framework.

And lastly, I could have added many other improvments but as this is a test project and for the sake of time I decided to ignore them.

## How to see it live?

You can think of this as a UI microservice. It is based on a docker container having node version 18.6 on the Ubuntu operating system. You may ask why I've done this, that is because of runtime *consistency*. Using docker compose this app runs everywhere with the same output and behavior.

If you've got **docker** with **docker compose** on your system you can just clone this repository and:

```shell
./do_start.sh ;
```

Thats it.

If you dont have **docker** do this:

```shell
cd website/source/ ;
yarn && yarn start ;
```

Now open your browser at [http://127.0.0.1:3000/](http://127.0.0.1:3000/) to see the app in action.

## License

MIT