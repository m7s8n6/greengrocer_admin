<template>
    <div>
        <div class="error-state-wrap">
            <div class="card error-state-card">
                <div class="card-body text-center">
                    <div class="error-state-code">403</div>
                    <h1 class="error-state-title">Forbidden</h1>
                    <p class="error-state-text">You are unauthorized to see this page.</p>
                    <div class="error-state-actions">
                        <router-link :to="homePath" class="btn btn-primary"><i class="bi bi-house-door me-2"></i>{{ __('dashboard') }}</router-link>
                        <button type="button" class="btn btn-outline-secondary" @click="$router.go(-1)"><i class="bi bi-arrow-left me-2"></i>Go Back</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import router from "../../router/index";
import Auth from "../../Auth";

export default {
    data : function(){
        return {
            img_url: this.$baseUrl + '/images/error-403.png'
        };
    },
    computed: {
        // Dashboard of the panel the user came from (admin / seller / delivery boy)
        homePath: function () {
            const path = (this.$route && this.$route.path) || '';
            if (path.indexOf('/seller') === 0) return '/seller';
            if (path.indexOf('/delivery_boy') === 0) return '/delivery_boy';
            return '/dashboard';
        }
    },
    created() {
        setTimeout(
            function() {
                if(!UserPermissions || !Auth.check()){
                    router.push("/login")
                }else{
                    router.push("/dashboard")
                }
            }, 2000);

    }
};
</script>

<style scoped>

@media (max-width: 575.98px) {
    .error-state-card .card-body {
        padding: 32px 20px;
    }

    .error-state-code {
        font-size: 56px;
    }

    .error-state-actions .btn {
        flex: 1 1 100%;
        justify-content: center;
    }
}
</style>
