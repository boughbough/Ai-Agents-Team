import csv, math, random
from itertools import combinations, chain
from pathlib import Path
import networkx as nx

def all_v(G): return set(G.nodes)
def is_dom(G,S):
    if not S: return False
    d=set(S)
    for v in S: d.update(G.neighbors(v))
    return d==all_v(G)
def is_total_dom(G,S):
    if not is_dom(G,S): return False
    return all(any(u in S for u in G.neighbors(v)) for v in S)
def is_conn_dom(G,S):
    return is_dom(G,S) and (len(S)<=1 or nx.is_connected(G.subgraph(S)))

def compute_gamma(G):
    V=list(G.nodes)
    for r in range(1,len(V)+1):
        for c in combinations(V,r):
            if is_dom(G,set(c)): return r
    return len(V)
def compute_gamma_t(G):
    V=list(G.nodes)
    for r in range(1,len(V)+1):
        for c in combinations(V,r):
            if is_total_dom(G,set(c)): return r
    return len(V)
def compute_gamma_c(G):
    V=list(G.nodes)
    for r in range(1,len(V)+1):
        for c in combinations(V,r):
            if is_conn_dom(G,set(c)): return r
    return len(V)

def gen_graph(n,p):
    while True:
        G=nx.gnp_random_graph(n,p)
        if nx.is_connected(G) and min(dict(G.degree()).values())>0: return G

random.seed(42)
satisfied=0; violated=0
Path('conjecture').mkdir(exist_ok=True)
with open('conjecture/results.csv','w',newline='') as f:
    w=csv.writer(f)
    w.writerow(['n','m','gamma','gamma_t','gamma_c','rhs','holds'])
    for i in range(1,201):
        n=random.randint(5,12)
        p=random.uniform(0.3,0.8)
        G=gen_graph(n,p)
        m=G.number_of_edges()
        g=compute_gamma(G)
        gt=compute_gamma_t(G)
        gc=compute_gamma_c(G)
        rhs=math.ceil((3*g+2*gc)/6)
        holds=gt>=rhs
        if holds: satisfied+=1
        else: violated+=1
        status='HOLDS' if holds else 'VIOLATION'
        print(f'[{i:03d}] n={n:2d}, m={m:3d} | gamma={g}, gamma_t={gt}, gamma_c={gc} | RHS={rhs} -> {status}')
        w.writerow([n,m,g,gt,gc,rhs,holds])

print(f'\n=== Summary ===')
print(f'Total : {satisfied+violated}')
print(f'HOLDS : {satisfied} ({satisfied/(satisfied+violated)*100:.2f}%)')
print(f'VIOLATIONS: {violated}')
