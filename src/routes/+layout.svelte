<script>
    import "../app.css";
    import { provider, auth, signInWithPopup, setUser, user, signOut } from "../Firebase";
    import Navbar from "../components/Navbar.svelte";

    const userMapper = claims => ({
        id: claims.user_id,
        name: claims.name,
        email: claims.email,
        picture: claims.picture
    });

    auth.onAuthStateChanged(async fireUser => {
        if (fireUser) {
            const token = await fireUser.getIdTokenResult();
            setUser(userMapper(token.claims));
        } else {
            setUser(null);
        }
    });


    async function login() {
        signInWithPopup(auth, provider);
    }

    async function logout() {
        signOut(auth);
    }

    $: loggedIn = $user !== null;
</script>

<Navbar on:login={login} on:logout={logout} loggedIn={loggedIn} />
<slot></slot>