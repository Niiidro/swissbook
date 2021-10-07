<script>
    import axios from '../configs/axios.js';
    console.log(axios);

    let user = {
        name: '',
        email: '',
        password: '',
    };
    let confirmPassword = '';

    function register() {
        console.log(register);
        if (!user.name && !user.email && user.password === confirmPassword) {
            axios
                .post('/register', {
                    register,
                })
                .then((response) => {
                    console.log(response);
                });
        }
    }
</script>

<main>
    <div class="card bordered w-min">
        <div class="card-body space-y-6">
            <h2 class="card-title">Registrieren</h2>
            <input
                type="text"
                placeholder="Name"
                class="input input-bordered"
                bind:value={user.name}
            />
            <input
                type="email"
                placeholder="E-Mail"
                class="input input-bordered"
                bind:value={user.email}
            />
            <input
                type="password"
                placeholder="Passwort"
                class="input input-bordered"
                bind:value={user.password}
            />
            <input
                type="password"
                placeholder="Passwort wiederholen"
                class="input input-bordered"
                bind:value={confirmPassword}
            />
            <div class="card-actions">
                <button class="btn btn-success" on:click|once={register}
                    >Registrieren</button
                >
            </div>
        </div>
    </div>
</main>
