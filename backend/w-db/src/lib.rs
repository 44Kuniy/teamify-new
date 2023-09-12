pub mod repository;

use diesel::Connection;

pub use crate::repository::*;
pub use diesel::PgConnection;

use diesel::r2d2::ConnectionManager;
use diesel::r2d2::Pool;

pub type DbCon = r2d2::PooledConnection<ConnectionManager<PgConnection>>;

#[derive(Clone)]
pub struct DbPool(r2d2::Pool<ConnectionManager<PgConnection>>);

impl DbPool {
    pub fn from_inner(inner: r2d2::Pool<ConnectionManager<PgConnection>>) -> Self {
        Self(inner)
    }

    pub fn get(&self) -> Result<DbCon, r2d2::Error> {
        self.0.get()
    }
}

pub fn get_connection_pool() -> Result<DbPool, r2d2::Error> {
    let url = database_url();
    let manager = ConnectionManager::<PgConnection>::new(url);
    let pool = Pool::builder()
        .test_on_check_out(true)
        .build(manager)
        .expect("Could not build connection pool");

    Ok(DbPool::from_inner(pool))
}

fn database_url() -> String {
    // postgres://postgres:postgres@localhost:5434/usu
    let user = "postgres";
    let password = "postgres";
    let host = "localhost";
    let port = "5434";
    let db = "dev";
    format!("postgres://{}:{}@{}:{}/{}", user, password, host, port, db)
}

pub fn establish_connection() -> PgConnection {
    PgConnection::establish(&database_url())
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url()))
}
